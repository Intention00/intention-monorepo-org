import React, { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { receiveReminderFromBackend } from '../../Generic/backendService';

const ContactPicker: React.FC<{ contacts: any[], selectedContact: any, setSelectedContact: any, setReminderData: any }> = ({ contacts, selectedContact, setSelectedContact, setReminderData }) => {
  const handleValueChange = async (itemValue) => {
    console.log("item value", itemValue)
    setSelectedContact(itemValue);
    console.log("Selected contact in picker ", selectedContact)
    try {
      const reminders = await receiveReminderFromBackend(itemValue);
      setReminderData(reminders || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  useEffect(() => {
    console.log("Selected contact in picker after state update:", selectedContact);
  }, [selectedContact]);

  return (
    <Picker
      selectedValue={selectedContact}
      style={{ alignSelf: 'center',marginTop: 5, backgroundColor: 'white', borderRadius: 10, width: '90%' }}
      itemStyle={{ backgroundColor: '#FFF', fontSize: 15, height: 120, borderRadius: 10 }}
      onValueChange={handleValueChange}
    >
      {contacts.map(contact => (
        <Picker.Item key={contact.contactID} label={`${contact.firstName} ${contact.lastName}`} value={contact.contactID} />
      ))}
    </Picker>
  );
}

export { ContactPicker };
