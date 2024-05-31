import React, { useState, useEffect, useContext } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, FlatList, Button } from "react-native";
import { styles } from "../ConnectModal/ConnectModal.style";
import { styles as global } from '../../Generic/global.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { 
  receiveContactsFromBackend, 
  sendReminderToBackend, 
  deleteReminderFromBackend,
  receiveReminderFromBackend,
  receiveRemindersFromBackend
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
    receiveContactsFromBackend(userID)
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
        Alert.alert('Error', 'Please select a contact first.');
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

      await sendReminderToBackend(selectedContact, reminderData);
      setRefreshReminders(!refreshReminders)

      Alert.alert('Notification Scheduled', `A ${notificationContent.title} notification will repeat.`);
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
      Alert.alert('Notification Canceled', 'The scheduled notification has been canceled.');
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
    
    switch (selectedFrequency.toLowerCase()) {
      case 'daily':
        title = 'Daily Alarm';
        body = 'DAILY';
        break;
      case 'weekly':
        title = 'Weekly Alarm';
        body = 'WEEKLY';
        break;
      case 'monthly':
        title = 'Monthly Alarm';
        body = 'MONTHLY';
        break;
      default:
        title = 'Sample Notification';
        body = 'This is a sample notification.';
    }
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
    if (!remindersData) {
      return null; // Do not render anything if remindersData is null
    }

    return (
      <View style={{ backgroundColor: global.accentColor.color, margin: 10, marginTop: 5, borderRadius: 10, padding: 10, position: 'relative' }}>
        <Text style={{ color: global.inputBox.color, textAlign: 'center', fontWeight: '500' }}>
          {remindersData.contactID ?? 'null'}
        </Text>
        <Text style={{ color: global.inputBox.color, textAlign: 'center' }}>{remindersData.frequency}</Text>
        <TouchableOpacity style={{ alignItems: 'center',justifyContent: 'center',position: 'absolute', top: 5, right: 5,borderRadius:50, padding: 5 }} onPress={() => handleCancelNotification(remindersData.contactID)}>
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}>🚫</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.centeredView, styles.modalView]}>
      <View style={[styles.modalBox]}>
        <View style={styles.modalHeader}>
          <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility} />
          <Text style={{ color: '#FFF', fontSize: 24, marginLeft: 53, fontWeight:'bold' }}> Set Up Reminder</Text>
        </View>
        <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Please select a contact</Text>
        <ContactPicker contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} setReminderData={setRemindersData} />
        <FrequencyPicker selectedFrequency={selectedFrequency} setSelectedFrequency={setSelectedFrequency} />
        <TouchableOpacity style={{ backgroundColor: global.accentColor.color, padding: 10, alignItems: 'center', borderRadius: 10, margin: 10, marginTop: 20,marginLeft:'5%', width: '90%' }} onPress={handleScheduleNotification}>
          <Text style={{ color: global.inputBox.color, fontSize: 16, fontWeight: '500' }}>Schedule Notification</Text>
        </TouchableOpacity>
        <View style={{marginLeft: 9, width: 369}}>{renderNotifItem()}</View>
      </View>
    </View>
  );
};

export { NotificationPrefs };
