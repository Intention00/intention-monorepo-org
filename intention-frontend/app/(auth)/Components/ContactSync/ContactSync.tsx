import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { sendContactsToBackend, receiveContactsFromBackend, receiveUserIDBackend } from './backendService';
import { saveContactsFromUser } from './contactService';
import {ContactList} from './ContactList';
import { userIDContext } from '../UserSync/userIDContext';
import { useUser } from '@clerk/clerk-expo';
import { handleUser } from '../UserSync/userService';
import { SyncContactButton } from './SyncContactButton';


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
                // const fetchedContacts = await saveContactsFromUser();
                const tempUserID = await handleUser(userEmail);
                setUserID(tempUserID);

                // Set contacts to those retrieved from database
                const recContacts = await receiveContactsFromBackend(tempUserID);
                setContacts(recContacts);

            }
            catch (err) {
                setError(err.message);
            }
            
        })()

  
        
    }, []);

    
    return (
        <SafeAreaView style={{flex:1, width: '100%'}}>
            <userIDContext.Provider value={userID}>
                <Text style={{marginTop: 10}}>{error}</Text>
                <SyncContactButton></SyncContactButton>
                <ContactList contacts={contacts}></ContactList>
            </userIDContext.Provider>
        </SafeAreaView>
    );
};

export {ContactSync};