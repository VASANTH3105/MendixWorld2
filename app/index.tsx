import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [ready, setReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<any>('/(onboarding)/screen1');

  useEffect(() => {
    const checkStatus = async () => {
      const onboarded = await AsyncStorage.getItem('onboardingDone');
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (!onboarded) {
        setInitialRoute('/(onboarding)/screen1');
      } else if (!loggedIn) {
        setInitialRoute('/(auth)/login');
      } else {
        setInitialRoute('/(tabs)/home');
      }

      setReady(true);
    };

    checkStatus();
  }, []);

  if (!ready) return null;

  return <Redirect href={initialRoute} />;
}
