import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Vibration } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { styles as global } from '../../Components/Generic/global.style';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPressOut={() => {Vibration.vibrate(130)}} onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={global.bodyText.color} />
    </Pressable>
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
        tabBarActiveTintColor: global.accentColor.color,
        tabBarInactiveTintColor: global.subText.color
      }}
    >

      <Tabs.Screen
        name="contactSync1"
        options={{
          headerTitle: 'Contacts',
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
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          tabBarLabel: 'Reminders',
          headerRight: () => <LogoutButton />
        }}
        redirect={!isSignedIn}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />

      
    </Tabs>
  );
};

export default TabsPage;
