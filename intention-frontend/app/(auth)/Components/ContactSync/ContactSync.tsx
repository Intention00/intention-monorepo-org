import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { sendContactsToBackend, receiveContactsFromBackend } from './backendService';
import { saveContactsFromUser } from './contactService';
import {ContactList} from './ContactList';
import { userIDContext } from '../UserSync/userIDContext';


const ContactSync: React.FC = ()=> {

    const [error, setError] = useState(undefined);
    const [contacts, setContacts] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            setError(undefined);
            try {
                const fetchedContacts = await saveContactsFromUser();

                // placeholder for userID logic
                const userID = 4;

                // Contacts array isn't empty, so we found some contacts
                if (fetchedContacts.length > 0) {
                    
                    // Used to set contacts = to received contacts from device
                    // setContacts(fetchedContacts);

                    await sendContactsToBackend(userID, fetchedContacts);

                }
                else {
                    setError('No contacts available.');
                }

                // Set contacts to those retrieved from database
                const recContacts = await receiveContactsFromBackend(userID);
                setContacts(recContacts);

            }
            catch (err) {
                setError(err.message);
            }
            
        })()

  
        
    }, []);

    // // Going through the contacts list of phone numbers to display them all
    // const getPhoneNumbers = (contact)=> {
    //     if (contact.phoneNumbers !== undefined) {
    //         return contact.phoneNumbers.map((phoneNumber, index)=> {
    //             return (
    //                 <View key={index}>
    //                     <Text>{phoneNumber.label}: {phoneNumber.number}</Text>
    //                 </View>
    //             )
    //         })
    //     }
    // }


    return (
        <SafeAreaView>
            <userIDContext.Provider value={0}>
                <Text style={{marginTop: 10}}>{error}</Text>
                <ContactList contacts={contacts}></ContactList>
            </userIDContext.Provider>
        </SafeAreaView>
    );
};

export {ContactSync};