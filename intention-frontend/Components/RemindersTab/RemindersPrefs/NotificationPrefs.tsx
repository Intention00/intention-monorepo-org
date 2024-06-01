import React, { useState, useEffect, useContext } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, FlatList, Button } from "react-native";
import { styles } from "../ConnectModal/ConnectModal.style";
import { styles as global } from '../../Generic/global.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { 
  receiveSetUpContactsFromBackend, 
  sendReminderToBackend, 
  deleteReminderFromBackend,
  receiveReminderFromBackend,
  sendReminderEditToBackend
} from '../../Generic/backendService';
import {
  scheduleLocalNotification,
  cancelScheduledNotification,
  requestNotificationPermission,
  NotificationContent,
} from './handle-local-notification';
import { ContactPicker } from './ContactPicker';
import { FrequencyPicker } from './FrequencyPicker';
import { ScheduledNotificationsList } from './ScheduledNotificationsList';
import * as Notifications from 'expo-notifications'; 

const NotificationPrefs: React.FC<{ toggleModalVisibility: () => void, setRefreshReminders, refreshReminders }> = ({ toggleModalVisibility, setRefreshReminders, refreshReminders }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [notificationIdentifier, setNotificationIdentifier] = useState<string | null>(null);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('Daily');
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [remindersData, setRemindersData] = useState(null); // New state for reminders

  const userID = useContext(userIDContext);

  useEffect(() => {
    fetchScheduledNotifications();
    handlePermissionRequest();
    receiveSetUpContactsFromBackend(userID)
      .then((contacts) => {
        setContacts(contacts);
        if (selectedContact === null) {
          setSelectedContact(contacts[0]?.contactID);
        } 
        console.log("Selected contact change notif prefs", selectedContact)
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
      });

    // Fetch reminders when the component mounts
    if (selectedContact) {
      fetchReminders(selectedContact);
    }
  }, [userID, selectedContact]);

  const fetchScheduledNotifications = async () => {
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      setScheduledNotifications(scheduled);
    } catch (error) {
      console.error('Failed to fetch scheduled notifications:', error);
      Alert.alert('Error', 'Failed to fetch scheduled notifications. Please try again.');
    }
  };

  const handlePermissionRequest = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
  };

  const handleScheduleNotification = async () => {
    try {
      if (!selectedContact) {
        Alert.alert('Please Select a Contact First');
        return;
      }

      if (selectedFrequency === "") {
        Alert.alert('Please Select a Frequency First');
        return;
      }

      const notificationContent = getNotificationContent(selectedContact);
      const trigger = getNotificationTrigger();
      const identifier = await scheduleLocalNotification(notificationContent, trigger);
      setNotificationIdentifier(identifier);

      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.getFullYear()}-${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}-${currentDateTime.getDate().toString().padStart(2, '0')} ${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}:${currentDateTime.getSeconds().toString().padStart(2, '0')}`;

      const reminderData = {
        contactID: selectedContact,
        dateTime: formattedDateTime,
        frequency: selectedFrequency,
        lastContacted: null,
      };
      try {
        await sendReminderToBackend(selectedContact, reminderData);
      }
      catch (err) {
        // Alert.alert('Reminder Already Exists', 'Delete the previous reminder before creating a new one.');
        // return;
        await sendReminderEditToBackend(selectedContact, reminderData);
      }
      
      setRefreshReminders(!refreshReminders)

      Alert.alert('Reminder Set');
      fetchScheduledNotifications();
      // Fetch updated reminders
      await fetchReminders(selectedContact);
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      Alert.alert('Error', 'Failed to schedule notification. Please try again.');
    }
  };

  const handleCancelNotification = async (contactID: number) => {
    try {
      await deleteReminderFromBackend(contactID);
      setRefreshReminders(!refreshReminders)
      Alert.alert('Reminder Cancelled');
      fetchScheduledNotifications();
      // Fetch updated reminders
      await fetchReminders(selectedContact);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      Alert.alert('Error', 'Failed to cancel notification. Please try again.');
    }
  };

  const fetchReminders = async (contactID) => {
    try {
      const remindersData = await receiveReminderFromBackend(contactID);
      console.log("REMINDERS RECEIVED notification prefs:", remindersData); // Log reminders
      setRemindersData(remindersData || null); // Ensure remindersData is set to null if no reminders
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const getNotificationContent = (contactID: number): NotificationContent => {
    let title = '';
    let body = '';

    try {
      const contact = contacts.filter(c => c.contactID === contactID)[0];
      title = `Time to Connect With ${contact.firstName} ${contact.lastName}`
      body = 'Click here to go to your Activity Feed.'
    } 
    catch {
      title = 'Come Look at Some of Your Missed Reminders'
      body = 'Click here to go to your Activity Feed.'
    }
    
    // switch (selectedFrequency.toLowerCase()) {
    //   case 'daily':
    //     title = `Daily Alarm`;
    //     body = 'DAILY';
    //     break;
    //   case 'weekly':
    //     title = 'Weekly Alarm';
    //     body = 'WEEKLY';
    //     break;
    //   case 'monthly':
    //     title = 'Monthly Alarm';
    //     body = 'MONTHLY';
    //     break;
    //   default:
    //     title = 'Sample Notification';
    //     body = 'This is a sample notification.';
    // }
    return { title, body };
  };

  const getNotificationTrigger = () => {
    let seconds;
    switch (selectedFrequency.toLowerCase()) {
      case 'daily':
        seconds = 60 * 60 * 24;
        break;
      case 'weekly':
        seconds = 60 * 60 * 24 * 7;
        break;
      case 'monthly':
        seconds = 60 * 60 * 24 * 30;
        break;
      default:
        seconds = 60 * 60 * 24;
    }
    return { repeats: true, seconds };
  };

  const renderNotifItem = () => {
    if (!remindersData || typeof remindersData !== 'object') {
      return null; // Do not render anything if remindersData is null
    }

    if (Object.keys(remindersData).length === 0 && remindersData.constructor === Object) {
      return null;
    }

    try {
      if (remindersData.contactID === undefined) {
        return null;
      }
    }
    catch (err) {
      return null;
    }

    return (
        <TouchableOpacity style={{ backgroundColor: global.inputBox.color, marginTop: 5, borderRadius: 10, padding: 10}} onPress={() => handleCancelNotification(remindersData.contactID)}>
          <Text style={{ color: global.accentColor.color, textAlign: 'center', fontWeight: '500', fontSize: 16 }}>
            Delete Reminder
          </Text>
          {/* <Text style={{ color: global.inputBox.color, textAlign: 'center' }}>{remindersData.frequency}</Text> */}
        </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.centeredView, styles.modalView]}>
      <View style={[styles.modalBox]}>
        <View style={styles.modalHeader}>
          <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility} />
          <Text style={{ color: '#FFF', fontSize: 24, marginLeft: '10%', fontWeight:'bold' }}>Reminder Settings</Text>
        </View>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: '5%'}}>Please select a contact</Text>
        <ContactPicker contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} setReminderData={setRemindersData} />
        <FrequencyPicker selectedFrequency={selectedFrequency} setSelectedFrequency={setSelectedFrequency} />
        <TouchableOpacity style={{ backgroundColor: global.accentColor.color, padding: 10, alignItems: 'center', borderRadius: 10, margin: 10, marginTop: 20,marginLeft:'5%', width: '90%' }} onPress={handleScheduleNotification}>
          <Text style={{ color: global.inputBox.color, fontSize: 16, fontWeight: '500' }}>Schedule Reminder</Text>
        </TouchableOpacity>
        <View style={{marginTop: '20%', width: '90%', alignSelf: 'center'}}>{renderNotifItem()}</View>
      </View>
    </View>
  );
};

export { NotificationPrefs };
