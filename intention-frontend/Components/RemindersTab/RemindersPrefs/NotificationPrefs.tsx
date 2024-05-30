import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, FlatList, Button} from "react-native"
import { styles } from "../ConnectModal/ConnectModal.style";
import {styles as global} from '../../Generic/global.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect, useContext } from "react";
import { 

  sendReminderToBackend, 
  receiveContactsFromBackend, 
  deleteReminderFromBackend} from '../../Generic/backendService';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";

import { Picker } from '@react-native-picker/picker';

import * as Notifications from 'expo-notifications';



import {
    scheduleLocalNotification,
    cancelScheduledNotification,
    checkNotificationPermission,
    requestNotificationPermission,
    NotificationContent,
  } from './handle-local-notification';

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
      handlePermissionRequest();

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

    // const checkPermissionStatus = async () => {
    // const granted = await checkNotificationPermission();
    // setHasPermission(granted);
    // };

    const handleScheduleNotification = async () => {
        try {
          const notificationContent = getNotificationContent(selectedContact);
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
            lastContacted: 0 // Assuming this is initially null
        };
        // Send reminder data to the backend
        console.log(reminderData.contactID)
        
        await sendReminderToBackend(selectedContact, (reminderData));
        

        Alert.alert('Notification Scheduled', `A ${notificationContent.title} notification will repeat.`);
        fetchScheduledNotifications(); // Update the list of scheduled notifications


        } catch (error) {
          console.error('Failed to schedule notification:', error);
          Alert.alert('Error', 'Failed to schedule notification. Please try again.');
        }
    };

    const handleCancelNotification = async (identifier: string, contactID: number) => {
      try {
        console.log("Canceling notification for contactID:", contactID); 
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

    const frequencies = ["Daily", "Weekly", "Monthly"];
    
    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={{color: '#FFF', fontSize: 24, marginLeft:20}}> Notification Preferences</Text>
                    {/* Header */}

                </View>
                <View>
                  {/* Permission Checker */}
                  {/* {hasPermission ? <Text style={{color: 'white'}}>Notification permission granted!</Text> : <Text style = {{color: 'white'}}>Notification permission not granted!</Text>}*/}
                  <Text style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>Please select a contact</Text>
                  {/* Dropdown menu for contacts */}
                  <Picker
                    selectedValue={selectedContact}
                    style={{ 
                      marginTop: 5,
                      backgroundColor: 'white', // Background color
                      borderRadius: 10,  
                                
                    }}
                    itemStyle={{
                      backgroundColor: '#bcbcbc',
                      fontSize: 15,
                      height: 120,
                      borderRadius: 10
                      

                    }}
                    onValueChange={(itemValue) => {
                      console.log("ItemValue:", itemValue)
                      console.log('Selected Contact Value Changed:', itemValue);
                      setSelectedContact(itemValue)
                    }}>
                      {contacts.map(contact => (
                      <Picker.Item key={contact.contactID} label={`${contact.firstName} ${contact.lastName}`} value={contact.contactID} />
                      ))}
                  </Picker>

                  {/* Choose your frequency */}
                   <Picker
                    selectedValue={selectedFrequency}
                    style={{ 
                      marginTop: 5,
                      backgroundColor: 'white', // Background color
                      borderRadius: 10,
                      
                    }}
                    itemStyle={{
                      backgroundColor: '#bcbcbc',
                      fontSize: 15,
                      height: 50,
                      borderRadius: 10,

                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log('Selected Contact Value Changed:', itemValue);
                      setSelectedFrequency(itemValue)
                    }}>
                      <Picker.Item label="Select a Frequency" value = ""/>
                      <Picker.Item label="Daily" value="Daily" />
                      <Picker.Item label="Weekly" value="Weekly" />
                      <Picker.Item label="Monthly" value="Monthly" /> 
                  </Picker>

                  {/* Schedule the Notification Locally & Store into Database */}
                  <TouchableOpacity style={{backgroundColor: global.accentColor.color, padding:10, alignItems:'center', borderRadius: 10, margin: 10, marginTop: 20}} onPress={handleScheduleNotification}>
                    <Text style={{color:global.inputBox.color, fontSize: 16}}>Schedule Notification</Text>
                  </TouchableOpacity>
                  <View style={{}}>
                    <FlatList
                    
                    data={scheduledNotifications}
                    renderItem={({ item }) => (
                      <View style={{backgroundColor: global.accentColor.color, marginTop: 10, margin: 10 , marginBottom: 5, borderRadius: 10}}>
                        <Text style={{
                          color: global.inputBox.color,
                          textAlign: 'center',
                          marginTop: 10,
                          fontWeight: '500'
                          }}>{item.content?.title}</Text>
                        <Text style={{
                          color: global.inputBox.color,    
                          textAlign: 'center'}}>{item.content?.body}</Text>
                          <TouchableOpacity style={{backgroundColor: '#F44336', padding:10, alignItems:'center', borderRadius: 10, marginTop: 5}} onPress={() => handleCancelNotification(item.identifier, selectedContact)}>
                            <Text style={{color: '#212121', fontSize: 16}}>Cancel Notification</Text>
                          </TouchableOpacity>
                        {/* <Button title="Cancel Notification" color={'#F44336'}onPress={() => handleCancelNotification(item.identifier, selectedContact)} /> */}
                      </View>
                    )}
                    keyExtractor={(item) => item.identifier.toString()}/>
                  </View>

                </View>
              </View>
          </View>
    )
}

export {NotificationPrefs}


{/* <Button title="Request Notification Permission" onPress={handlePermissionRequest} /> */}
{/* <Button title="Check Notification Permission" onPress={checkPermissionStatus} /> */}