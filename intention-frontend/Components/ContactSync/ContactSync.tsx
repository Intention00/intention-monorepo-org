import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactSync: React.FC = ()=> {

    const [error, setError] = useState(undefined);
    const [contacts, setContacts] = useState(undefined);

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

                        // send contacts to backend
                        sendContacts(data);
                        
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

    // Sending contacts to the backend api
    const sendContacts = async (contactsData)=> {
        try {
            const formattedContacts = contactsData.map((contact)=> ({
                name: contact.firstName + " " + contact.lastName,
                number: '000-000-0000'
            }))
            console.log()
            const response = fetch('http://127.0.0.1:5100/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedContacts)
        
            })
        }
        catch (e) {
            console.log(e);
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