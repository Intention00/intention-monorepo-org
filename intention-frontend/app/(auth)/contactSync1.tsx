import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import {ContactSync} from '../../Components/ContactsTab/DisplayContacts/ContactSync';
import { saveContactsFromUser } from '../../Components/ContactsTab/DisplayContacts/contactService';
import * as Contacts from 'expo-contacts';
import { styles as global } from '../../Components/Generic/global.style';

const ContactSync1 = () => {
  const { user } = useUser();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      
      // Optionally, any other actions to be performed after user login
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]); // Depend on the user object

  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, global.background]}>
      {isUserLoggedIn && <ContactSync />}
    </View>
  );
};

export default ContactSync1;
