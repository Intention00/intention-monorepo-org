import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { DeleteUser } from '../../Components/ProfileTab/DeleteUser/DeleteUser';
import { DeleteUserData } from '../../Components/ProfileTab/DeleteUser/DeleteUserData';
import { handleUser } from '../../Components/ContactsTab/UserSync/userService';
import { userIDContext } from '../../Components/ContactsTab/UserSync/userIDContext';
import { styles as global } from '../../Components/Generic/global.style';
import { UserProfileTags } from '../../Components/ContactsTab/ContactsTagging/UserTag';
import { SelectorPlusHeader } from '../../Components/ProfileTab/SelectModel/SelectorPlusHeader';

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  // temporary retrieval for userID, need to change for better solution
  const [userID, setUserID] = useState(undefined);
  const userEmail = user['primaryEmailAddress']['emailAddress'];

  useEffect(()=> {
    (async ()=> {
      const tempUserID = await handleUser(userEmail);
      setUserID(tempUserID);
    })()
  }, []);


  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user.update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  return (
    <View style={[global.background, styles.container]}>
     <userIDContext.Provider value={userID}>
      {/* <Text style={[global.bodyText, { textAlign: 'center' }]}>
        Good morning {user.firstName} {user.lastName}!
      </Text> */}

      <View style={{marginTop: '10%', marginBottom: '30%'}}>
        <SelectorPlusHeader></SelectorPlusHeader>
      </View>
      

      {/* <View style={{marginTop: 50, marginBottom: 50}}>   */}
          {/* <DeleteUser></DeleteUser> */}
          {/* <DeleteUserData></DeleteUserData> */}

      {/* </View> */}
      
      <UserProfileTags></UserProfileTags>
       
     
    </userIDContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
  },
});

export default Profile;
