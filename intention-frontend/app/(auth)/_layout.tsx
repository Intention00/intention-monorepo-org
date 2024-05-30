import { Tabs } from 'expo-router';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Button, ScrollView, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { Pressable, Vibration } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { styles as global } from '../../Components/Generic/global.style';
import { useState } from 'react';
import { styles } from '../../Components/ContactsTab/ContactsTagging/ContactTags.style'

export const LogoutButton = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (

    <View>
      <Pressable onPressOut={() => {Vibration.vibrate(130)}} onPress={()=> setIsModalVisible(true)} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={global.bodyText.color} />
    </Pressable>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
          <View style={styles.modalCenter}>
            <View style={styles.modalView}>
              <View style={{paddingTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center'}}>
                <Ionicons name="log-out-outline" size={130} color={'#fa4a3d'} style={{paddingLeft: '35%'}} />
                {/* <View style={{flex: 1}}>
                  <Text style={styles.modalHeaderText}>SignOut</Text>
                </View> */}
              </View>
              <View style={{paddingLeft:15}}>
                  <Text style={{color: global.bodyText.color, fontWeight: 'bold', textAlign: 'center', fontSize: 16}}> Oh No, Are you Sure You want to Sign Out of this Account?</Text>
              </View>
              <View style={{alignSelf: 'flex-end', paddingTop: "15%",flexDirection:'row', }}>
                  <View style={{paddingRight: "3%"}}>
                  <TouchableOpacity style={{
                    backgroundColor: styles.modalButton.backgroundColor,
                    borderRadius: 5,
                    padding: 10,
                    width: "auto"}} onPress={() => setIsModalVisible(false)}>
                    <Text style={{fontSize:16, color:global.bodyText.color}}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{
                    backgroundColor: global.accentColor.color,
                    borderRadius: 5,
                    padding: 10,
                    width: "auto"}} onPress={doLogout}>
                    <Text style={{fontSize:16, color:global.buttonText.color, fontWeight:'bold'}}>Yes, Sign Me Out</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
      </Modal>

    </View>
    

  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          // backgroundColor: '#161616',
          backgroundColor: global.background.backgroundColor,
        },
        // headerTintColor: '#fff',
        headerTintColor: global.headerText.color,
        tabBarStyle: {
          // backgroundColor: '#282828'
          backgroundColor: global.tabBarBackground.color,
        },
        // tabBarActiveTintColor: '#FFCC00'
        tabBarActiveTintColor: global.subText.color,
        tabBarInactiveTintColor: global.accentColor.color
      }}
    >

      <Tabs.Screen
        name="contactSync1"
        options={{
          headerTitle: 'Contacts',
          headerStyle: {
            backgroundColor: global.headerColor.color
          },
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'Contacts',
          headerRight: () => <LogoutButton />
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="reminders"
        options={{
          headerTitle: 'Upcoming Reminders',
          headerStyle: {
            backgroundColor: global.headerColor.color
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          tabBarLabel: 'Reminders',
          headerRight: () => <LogoutButton />
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Dashboard',
          headerStyle: {
            backgroundColor: global.headerColor.color
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'Dashboard',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="followup"
        options={{
          headerTitle: 'Activity Feed',
          headerStyle: {
            backgroundColor: global.headerColor.color
          },
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'Activity Feed',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />

      
    </Tabs>
  );
};

export default TabsPage;
