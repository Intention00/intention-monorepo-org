import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#161616',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#282828'
        },
        tabBarActiveTintColor: '#FFCC00'
      }}
    >
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
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
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

      <Tabs.Screen
      name="contactSync1"
      options={{
        headerTitle: 'Contact Sync',
        tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        tabBarLabel: 'Contact Sync',
        headerRight: () => <LogoutButton />
      }}
      redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
