import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { sendContactsToBackend, receiveContactsFromBackend, receiveUserIDBackend } from './backendService';
import { saveContactsFromUser } from './contactService';
import {ContactList} from './ContactList';
import { userIDContext } from '../UserSync/userIDContext';
import { useUser } from '@clerk/clerk-expo';
import { handleUser } from '../UserSync/userService';


const ContactSync: React.FC = ()=> {

    const [error, setError] = useState(undefined);
    const [contacts, setContacts] = useState(undefined);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    useEffect(()=> {
        (async ()=> {
            setError(undefined);
            try {
                const fetchedContacts = await saveContactsFromUser();
                setUserID(await handleUser(userEmail));
                


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

  
        
    }, [userID]);

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
            <userIDContext.Provider value={userID}>
                <Text style={{marginTop: 10}}>{error}</Text>
                <ContactList contacts={contacts}></ContactList>
            </userIDContext.Provider>
        </SafeAreaView>
    );
};

export {ContactSync};