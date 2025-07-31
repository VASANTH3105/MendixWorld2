import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Screen3() {
  const router = useRouter();
  const finish = async () => {
    await AsyncStorage.setItem('onboardingDone', 'true');
    router.replace('/(auth)/login');
  };
  return (
    <View><Text>Get Started</Text><Button title="Finish" onPress={finish} /></View>
  );
}
