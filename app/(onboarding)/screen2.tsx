
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen2() {
  const router = useRouter();
  return (
    <View><Text>Learn with Us</Text><Button title="Next" onPress={() => router.push('/(onboarding)/screen3')} /></View>
  );
}