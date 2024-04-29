import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, FlatList, Button} from "react-native"
import { styles } from "../ConnectModal/ConnectModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect, useContext } from "react";
import { 
  receiveReminderFromBackend, 
  sendReminderToBackend, 
  receiveContactsFromBackend, 
  deleteReminderFromBackend} from '../../../Components/Generic/backendService';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";

import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

import { v4 as uuidv4 } from 'uuid';


import {
    scheduleLocalNotification,
    cancelScheduledNotification,
    checkNotificationPermission,
    requestNotificationPermission,
    NotificationContent,
  } from '../../../Components/RemindersTab/RemindersPrefs/handle-local-notification';

const NotificationPrefs: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {
    // Placeholder for provided info
    // const contact = {contactID: 6, firstName: 'Hank', lastName: 'Zakroff'}
    const [hasPermission, setHasPermission] = useState(false);
    const [notificationIdentifier, setNotificationIdentifier] = useState<string | null>(null);
    const [scheduledNotifications, setScheduledNotifications] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState('Daily');
    const [selectedContact, setSelectedContact] = useState(null); // New state for selected contact
    const [contacts, setContacts] = useState([]);

    const userID = useContext(userIDContext)

    
    useEffect(() => {
      // Fetch contacts when component mounts
      fetchScheduledNotifications();

      receiveContactsFromBackend(userID)
          .then((contacts) => {
              // Once contacts are received, update the state
              setContacts(contacts);
          })
          .catch((error) => {
              console.error('Error fetching contacts:', error);
          });
  }, [userID]); 
    
    const fetchScheduledNotifications = async () => {
        try {
          const scheduled = await Notifications.getAllScheduledNotificationsAsync();
          setScheduledNotifications(scheduled);
          console.log('Scheduled Notifications:', scheduled); // Log scheduled notifications
          
        } catch (error) {
          console.error('Failed to fetch scheduled notifications:', error);
          Alert.alert('Error', 'Failed to fetch scheduled notifications. Please try again.');
        }
      };

    const handlePermissionRequest = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
    };

    const checkPermissionStatus = async () => {
    const granted = await checkNotificationPermission();
    setHasPermission(granted);
    };

    const handleScheduleNotification = async () => {
        try {
          const notificationContent = getNotificationContent();
          const trigger = getNotificationTrigger();
          const identifier = await scheduleLocalNotification(notificationContent, trigger);
          setNotificationIdentifier(identifier);
          
          // Get the current date/time
          const currentDateTime = new Date();
          // Extract individual components
          const year = currentDateTime.getFullYear();
          const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
          const day = currentDateTime.getDate().toString().padStart(2, '0');
          const hours = currentDateTime.getHours().toString().padStart(2, '0');
          const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
          const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

          const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

          console.log('Selected Contact:', selectedContact);

         
          // Extract relevant data for the reminder
          const reminderData = {
         
            contactID: selectedContact, // 
            dateTime: formattedDateTime, // Assuming date is part of notificationContent
            frequency: selectedFrequency, // Assuming frequency is part of notificationContent
            lastContacted: null // Assuming this is initially null
        };
        // Send reminder data to the backend
        console.log(reminderData.dateTime)
        await sendReminderToBackend(selectedContact, reminderData);
        

        Alert.alert('Notification Scheduled', `A ${notificationContent.title} notification will repeat.`);
        fetchScheduledNotifications(); // Update the list of scheduled notifications






        } catch (error) {
          console.error('Failed to schedule notification:', error);
          Alert.alert('Error', 'Failed to schedule notification. Please try again.');
        }
      };

      const handleCancelNotification = async (identifier: string, contactID: number) => {
        try {
          console.log("Canceling notification for identifier:", contactID); // Add this line
          // Remove/Cancel it locally first
          await cancelScheduledNotification(identifier);

          // Remove the reminder from the backend
          await deleteReminderFromBackend(contactID);

          Alert.alert('Notification Canceled', 'The scheduled notification has been canceled.');
          fetchScheduledNotifications(); // Update the list of scheduled notifications
        } catch (error) {
          console.error('Failed to cancel notification:', error);
          Alert.alert('Error', 'Failed to cancel notification. Please try again.');
        }
      };
    
    
    
      const getNotificationContent = (): NotificationContent => {
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
            seconds = 60 * 60 * 24; // Daily Reminder in seconds
            break;
          case 'weekly':
            seconds = 60 * 60 * 24 * 7; // Weekly Reminder in seconds
            break;
          case 'monthly':
            seconds = 60 * 60 * 24 * 30; // Monthly Reminder in seconds
            break;
          default:
            seconds = 60 * 60 * 24; // Default to daily
        }
        return { repeats: true, seconds };
      };

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={styles.modalHeaderText}>Preferences</Text>
                    {/* Header */}

                </View>
                <View>
                    <Button title="Request Notification Permission" onPress={handlePermissionRequest} />
                    <Button title="Check Notification Permission" onPress={checkPermissionStatus} />
                    <Button title="Schedule Notification" onPress={handleScheduleNotification} />
                    {hasPermission ? <Text>Notification permission granted!</Text> : <Text>Notification permission not granted!</Text>}
                    <Picker
                        selectedValue={selectedFrequency}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => {
                          console.log('Selected Contact Value Changed:', itemValue);
                          setSelectedFrequency(itemValue)}
                        }
                    >
                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Weekly" value="Weekly" />
                        <Picker.Item label="Monthly" value="Monthly" /> 
                    </Picker>
                    

                    {/* Dropdown menu for contacts */}
                    <Picker
                        selectedValue={selectedContact}
                        style={{ marginTop: 100, height: 50, width: 200 }}
                        onValueChange={(itemValue) => {
                          console.log('Selected Contact Value Changed:', itemValue);

                          setSelectedContact(itemValue)}}
                    >
                        {contacts.map(contact => (
                            <Picker.Item key={contact.contactID} label={`${contact.firstName} ${contact.lastName}`} value={contact.contactID} />
                        ))}
                    </Picker>

                    <View style={{ marginTop: 100 }}>
                      <FlatList
                          data={scheduledNotifications}
                          renderItem={({ item }) => (
                          <View>
                              <Text>{item.content?.title}</Text>
                              <Text>{item.content?.body}</Text>
                              <Button title="Cancel Notification" onPress={() => handleCancelNotification(item.identifier, item.contactID)} />
                          </View>
                          )}
                          keyExtractor={(item) => item.identifier.toString()}
                      />
                    </View>
                    
                
                    
                    </View>
            
            </View>
        </View>
    )
}

export {NotificationPrefs}