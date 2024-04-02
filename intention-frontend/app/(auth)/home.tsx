import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { styles as global } from '../../Components/Generic/global.style';

const Home = () => {
  const { user } = useUser();

  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, global.background]}>
      <Text style={global.bodyText}> Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      <Text style={global.bodyText}> Guess what! I know your name {user?.firstName}</Text>
    </View>
  );
};

export default Home;
