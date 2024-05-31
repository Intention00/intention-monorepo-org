import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { scoreContext, ScoreProvider } from '../Components/Generic/scoreContext';

// const CLERK_PUBLISHABLE_KEY = 'pk_test_ZGlzY3JldGUta2FuZ2Fyb28tMzEuY2xlcmsuYWNjb3VudHMuZGV2JA';
const CLERK_PUBLISHABLE_KEY = 'pk_test_ZW1lcmdpbmctbXVkZmlzaC0yNC5jbGVyay5hY2NvdW50cy5kZXYk';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace('/reminders');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  const [scoreValue, setScoreValue] = useState(-1)

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <scoreContext.Provider value={{scoreValue, setScoreValue}}>
        <InitialLayout />
      </scoreContext.Provider>
    </ClerkProvider>
  );
};

export default RootLayout;
