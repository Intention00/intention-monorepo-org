import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles as global} from '../../Components/Generic/global.style'
import { Image } from 'expo-image';
import appIcon from '../../assets/appicon_redesign_bluebg.png';


const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  const blurhash = 
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={{alignSelf:'center', marginTop: -75, marginBottom: 50}}>
        <Image style={styles.image} 
          source={appIcon}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <TextInput autoCapitalize="none" placeholder="intention@w.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} onSubmitEditing={onSignInPress}/>

      {/* <Button onPress={onSignInPress} title="Login" color={global.accentColor.color}>

      </Button> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSignInPress} style={styles.loginButton}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: global.background.backgroundColor,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: global.accentColor.color,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 25,
    alignItems: 'center',
  },
  text: {
    color: global.bodyText.color,
  },
  buttonContainer: {
    flexDirection: 'row',
     width: "100%",
  },
  loginButton: {
    backgroundColor: global.accentColor.color,
    padding: 6,
    borderRadius: 2,
    alignItems: 'center',
    width:'100%',
    height: '120%',
},

  buttonText: {
    fontWeight:'bold',
    fontSize: 15,
  },

  image: {
    width: 200, 
    height: 200,
    borderRadius: 100,
    marginRight: 0,
    marginLeft: 0
},
});

export default Login;
