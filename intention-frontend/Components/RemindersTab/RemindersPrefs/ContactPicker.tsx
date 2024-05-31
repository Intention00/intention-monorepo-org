import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { receiveReminderFromBackend } from '../../Generic/backendService';

const ContactPicker: React.FC<{ contacts: any[], selectedContact: any, setSelectedContact: any , setReminderData: any}> = ({ contacts, selectedContact, setSelectedContact, setReminderData }) => {
    return (
        <Picker
            selectedValue={selectedContact}
            style={{ marginTop: 5, backgroundColor: 'white', borderRadius: 10 }}
            itemStyle={{ backgroundColor: '#bcbcbc', fontSize: 15, height: 120, borderRadius: 10 }}
            onValueChange={ async (itemValue) => {setSelectedContact(itemValue); console.log(selectedContact); setReminderData(await receiveReminderFromBackend(itemValue))}}>
            
            {contacts.map(contact => (
                <Picker.Item key={contact.contactID} label={`${contact.firstName} ${contact.lastName}`} value={contact.contactID} />
                
            ))}
        </Picker>
    );
    
}

export  {ContactPicker};
