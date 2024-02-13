import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import {ContactSync} from './Components/ContactSync/ContactSync';
import { saveContactsFromUser } from './Components/ContactSync/contactService';
import * as Contacts from 'expo-contacts';

const ContactSync1 = () => {
  const { user } = useUser();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });
  
          if (data.length > 0) {
            const contact = data[1];
            console.log(contact);
          }
        }
      })();
      console.log("save contacts attempt");
      
      // Optionally, any other actions to be performed after user login
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]); // Depend on the user object

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isUserLoggedIn && <ContactSync />}
    </View>
  );
};

export default ContactSync1;
