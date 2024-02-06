import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import ContactSync from './Components/ContactSync/ContactSync';


const contactSync1 = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <ContactSync></ContactSync>
    
    </View>
  );
};

export default contactSync1;
