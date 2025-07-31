import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen1() {
  const router = useRouter();
  return (
    <View><Text>Welcome to App</Text><Button title="Next" onPress={() => router.push('/(onboarding)/screen2')} /></View>
  );
}
