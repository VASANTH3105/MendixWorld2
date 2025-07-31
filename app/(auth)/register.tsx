import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const register = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    router.replace('/(tabs)/home');
  };
  return (
    <View>
      <Text>Register</Text>
      <Button title="Submit" onPress={register} />
    </View>
  );
}