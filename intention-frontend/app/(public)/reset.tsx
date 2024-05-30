import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import {styles as global} from '../../Components/Generic/global.style'
import {styles as frontPage} from '../(public)/login'

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput autoCapitalize="none" placeholder="intention@w.com" value={emailAddress} onChangeText={setEmailAddress} style={frontPage.inputField} />

          {/* <Button onPress={onRequestReset} title="Send Reset Email" color={'#6c47ff'}></Button> */}
          <View style={frontPage.buttonContainer}>
            <TouchableOpacity onPress={onRequestReset} style={frontPage.loginButton}>
              <Text style={frontPage.buttonText}>
                Send Reset Email
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <TextInput value={code} placeholder="Verification Code" style={frontPage.inputField} onChangeText={setCode} />
            <TextInput placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry style={frontPage.inputField} />
          </View>
          {/* <Button onPress={onReset} title="Set new Password" color={'#6c47ff'}></Button> */}
          <View style={frontPage.buttonContainer}>
            <TouchableOpacity onPress={onReset} style={frontPage.loginButton}>
              <Text style={frontPage.buttonText}>
                Set New Password
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
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default PwReset;
