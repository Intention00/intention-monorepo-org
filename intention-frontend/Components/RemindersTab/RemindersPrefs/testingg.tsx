import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, FlatList, Button} from "react-native"
import { styles } from "../ConnectModal/ConnectModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";


import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

import { receiveScoreFromBackend, sendScoreToBackend } from "../../Generic/backendService"


import {
    scheduleLocalNotification,
    cancelScheduledNotification,
    checkNotificationPermission,
    requestNotificationPermission,
    NotificationContent,
  } from '../../../Components/RemindersTab/RemindersPrefs/handle-local-notification';

const NotificationPrefs: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {
    // Placeholder for provided info
    const contact = {contactID: 6, firstName: 'Hank', lastName: 'Zakroff'}
    const [hasPermission, setHasPermission] = useState(false);
    const [notificationIdentifier, setNotificationIdentifier] = useState<string | null>(null);
    const [scheduledNotifications, setScheduledNotifications] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState('Daily');
  
    useEffect(()=> {
        (async ()=> {
            try {
                fetchScheduledNotifications(); // Fetch currently scheduled notifications on component mount
                
            }
            catch (err) {

            }
        })()
    }, []);
    
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
          Alert.alert('Notification Scheduled', `A ${notificationContent.title} notification will repeat.`);
          fetchScheduledNotifications(); // Update the list of scheduled notifications
        } catch (error) {
          console.error('Failed to schedule notification:', error);
          Alert.alert('Error', 'Failed to schedule notification. Please try again.');
        }
      };

      const handleCancelNotification = async (identifier: string) => {
        try {
          await cancelScheduledNotification(identifier);
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
            seconds = 65; // Daily Reminder in seconds
            break;
          case 'weekly':
            seconds = 86; // Weekly Reminder in seconds
            break;
          case 'monthly':
            seconds = 70; // Monthly Reminder in seconds
            break;
          default:
            seconds = 65; // Default
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
                
                    <Picker
                        selectedValue={selectedFrequency}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedFrequency(itemValue)}
                    >
                        <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Weekly" value="Weekly" />
                        <Picker.Item label="Monthly" value="Monthly" /> 
                    </Picker>
                
                    <FlatList
                        data={scheduledNotifications}
                        renderItem={({ item }) => (
                        <View>
                            <Text>{item.content?.title}</Text>
                            <Text>{item.content?.body}</Text>
                            <Button title="Cancel Notification" onPress={() => handleCancelNotification(item.identifier)} />
                        </View>
                        )}
                        keyExtractor={(item) => item.identifier.toString()}
                    />
                
                    {hasPermission ? <Text>Notification permission granted!</Text> : <Text>Notification permission not granted!</Text>}
                </View>
            
            </View>
        </View>
    )
}

export {NotificationPrefs}