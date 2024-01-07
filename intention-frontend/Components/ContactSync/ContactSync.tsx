import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactSync: React.FC = ()=> {

    let [error, setError] = useState(undefined);
    let [contacts, setContacts] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            try {
                // Trying to receive permission to extract contacts from user
                const {status} = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        // We want the names along with numbers from each contact
                        fields: [
                            Contacts.Fields.FirstName,
                            Contacts.Fields.LastName,
                            Contacts.Fields.PhoneNumbers
                        ]
                    });
                    
                    // Checking to see if any contacts were extracted from the user's device
                    if (data.length > 0) {
                        setContacts(data);
                        
                    } else {
                        setError("No contacts available");
                    }
                } else {
                    setError('Permission to access contacts denied.');
                }
            }
            catch (err) {
                console.log("Error with promise: ", err);
            }
            
        })()
        
    }, [])

    // Going through the contacts list of phone numbers to display them all
    const getPhoneNumbers = (contact)=> {
        if (contact.phoneNumbers !== undefined) {
            return contact.phoneNumbers.map((phoneNumber, index)=> {
                return (
                    <View key={index}>
                        <Text>{phoneNumber.label}: {phoneNumber.number}</Text>
                    </View>
                )
            })
        }
    }

    // Going through each contact in the list, and extracting their individual info
    const getContacts = ()=> {
        if (contacts !== undefined) {
            return contacts.map((contact, index) => {
                return (
                    <View key={index}>
                        <Text>Name: {contact.firstName} {contact.lastName}</Text>
                        {getPhoneNumbers(contact)}
                    </View>
                );
            });

        } else {
            return <Text>Contacts loading...</Text>
        }
    }


    return (
        <View>
            <Text>{error}</Text>
            {getContacts()}
        </View>
    );
};

export default ContactSync;