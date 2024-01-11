import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { sendContactsToBackend } from './backendService';
import { getContacts } from './contactService';
import ContactList from './ContactList';

const ContactSync: React.FC = ()=> {

    const [error, setError] = useState(undefined);
    const [contacts, setContacts] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            setError(undefined);
            try {
                const fetchedContacts = await getContacts();

                // Contacts array isn't empty, so we found some contacts
                if (fetchedContacts.length > 0) {
                    
                    // TODO: Need to find a way to make this happen immediately, not async
                    setContacts(fetchedContacts);
                    await sendContactsToBackend(fetchedContacts);
                }
                else {
                    setError('No contacts available.');
                }
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

    // // Going through each contact in the list, and extracting their individual info
    // const displayContactsList = ()=> {
    //     if (contacts !== undefined) {
    //         return contacts.map((contact, index) => {
    //             return (
    //                 <View key={index}>
    //                     <Text>Name: {contact.firstName} {contact.lastName}</Text>
    //                     {getPhoneNumbers(contact)}
    //                 </View>
    //             );
    //         });

    //     } else {
    //         return <Text>Contacts loading...</Text>
    //     }

    // }

    return (
        <SafeAreaView>
            <Text>{error}</Text>
            {/* {displayContactsList()} */}
            <ContactList contacts={contacts}></ContactList>
        </SafeAreaView>
    );
};

export default ContactSync;