import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, Modal, Button, Alert } from "react-native";
import { styles } from "../ConnectModal/ConnectModal.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { 
  receiveContactsFromBackend, 
  sendReminderToBackend, 
  deleteReminderFromBackend } from '../../Generic/backendService';
import {
  scheduleLocalNotification,
  cancelScheduledNotification,
  requestNotificationPermission,
  NotificationContent,
} from './handle-local-notification';

import {ContactPicker} from './ContactPicker';
import {FrequencyPicker} from './FrequencyPicker';
import {ScheduledNotificationsList} from './ScheduledNotificationsList';

const NotificationPrefs: React.FC<{ toggleModalVisibility }> = ({ toggleModalVisibility }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [notificationIdentifier, setNotificationIdentifier] = useState<string | null>(null);
    const [scheduledNotifications, setScheduledNotifications] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState('Daily');
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const userID = useContext(userIDContext);

    useEffect(() => {
        fetchScheduledNotifications();
        handlePermissionRequest();
        receiveContactsFromBackend(userID)
            .then((contacts) => {
                setContacts(contacts);
                setSelectedContact(contacts[0]?.contactID);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    }, [userID]);

    const fetchScheduledNotifications = async () => {
        try {
            const scheduled = await Notifications.getAllScheduledNotificationsAsync();
            setScheduledNotifications(scheduled);
            console.log('Scheduled Notifications:', scheduled);
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

            Alert.alert('Notification Scheduled', `A ${notificationContent.title} notification will repeat.`);
            fetchScheduledNotifications();
        } catch (error) {
            console.error('Failed to schedule notification:', error);
            Alert.alert('Error', 'Failed to schedule notification. Please try again.');
        }
    };

    const handleCancelNotification = async (identifier: string, contactID: number) => {
        try {
            await cancelScheduledNotification(identifier);
            await deleteReminderFromBackend(contactID);
            Alert.alert('Notification Canceled', 'The scheduled notification has been canceled.');
            fetchScheduledNotifications();
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

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility} />
                    <Text style={styles.modalHeaderText}>Notif Preferences</Text>
                </View>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Please select a contact</Text>
                <ContactPicker contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
                <FrequencyPicker selectedFrequency={selectedFrequency} setSelectedFrequency={setSelectedFrequency} />
                <Button title="Schedule Notification" onPress={handleScheduleNotification} />
                <ScheduledNotificationsList scheduledNotifications={scheduledNotifications} handleCancelNotification={handleCancelNotification} selectedContact={selectedContact} />
            </View>
        </View>
    );
}

export { NotificationPrefs };
