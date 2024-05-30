import React from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import {styles as global} from '../../Generic/global.style'

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
            <View style={{ backgroundColor: global.accentColor.color, margin:10,marginTop: 5, borderRadius: 10, padding: 10, position: 'relative' }}>
              <Text style={{ color: global.inputBox.color, textAlign: 'center', fontWeight:'500' }}>{item.reminder.dateTime}</Text>
              <Text style={{ color: global.inputBox.color, textAlign: 'center' }}>{item.reminder.frequency}</Text>
              <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={confirmAndCancelAll}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize:35 }}>X</Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
        keyExtractor={(item) => item.contact.contactID.toString()}
      />
    </View>
  );
};

export  {ScheduledNotificationsList};
