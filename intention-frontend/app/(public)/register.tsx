import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import {styles as global} from '../../Components/Generic/global.style'
import {styles as frontPage} from '../(public)/login'

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput autoCapitalize="none" placeholder="intention@w.com" value={emailAddress} onChangeText={setEmailAddress} style={frontPage.inputField} />
          <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={frontPage.inputField} />
          <TextInput placeholder="first name" value={firstName} onChangeText={setFirstName} style={frontPage.inputField} />
          <TextInput placeholder="last name" value={lastName} onChangeText={setLastName}  style={frontPage.inputField} />

          {/* <Button onPress={onSignUpPress} title="Sign up" color={'#6c47ff'}></Button> */}
          <View style={frontPage.buttonContainer}>
            <TouchableOpacity onPress={onSignUpPress} style={frontPage.loginButton}>
              <Text style={frontPage.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
      </View>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Verification Code" style={frontPage.inputField} onChangeText={setCode} />
          </View>
          {/* <Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'}></Button> */}
          <View style={frontPage.buttonContainer}>
            <TouchableOpacity onPress={onPressVerify} style={frontPage.loginButton}>
              <Text style={frontPage.buttonText}>
                Verify Email
              </Text>
            </TouchableOpacity>
      </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Register;
