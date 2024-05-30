import React from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";

const ScheduledNotificationsList: React.FC<{ reminders: any[], handleCancelNotification: any, selectedContact: any }> = ({ reminders, handleCancelNotification, selectedContact }) => {
  const confirmAndCancelAll = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete all notifications for this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => handleCancelNotification(selectedContact)
        }
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          item && item.contact && item.reminder ? (
            <View style={{ backgroundColor: '#bcbcbc', marginTop: 5, borderRadius: 10, padding: 10, position: 'relative' }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>{item.reminder.dateTime}</Text>
              <Text style={{ color: 'white', textAlign: 'center' }}>{item.reminder.frequency}</Text>
              <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={confirmAndCancelAll}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
        keyExtractor={(item) => item.contact.contactID.toString()}
      />
      {reminders.length > 0 && (
        <Button title="Delete All Notifications" onPress={confirmAndCancelAll} />
      )}
    </View>
  );
};

export  {ScheduledNotificationsList};
