import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactSync: React.FC = ()=> {

    let [error, setError] = useState(undefined);
    let [contacts, setContacts] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            try {
                const {status} = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.FirstName,
                            Contacts.Fields.LastName,
                            Contacts.Fields.PhoneNumbers
                        ]
                    });

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