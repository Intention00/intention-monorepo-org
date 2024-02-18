import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';



const Home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
   <Text> Guess what! I know your name {user?.firstName}</Text>
    
    </View>
  );
};

export default Home;
