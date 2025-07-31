import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    router.replace('/(auth)/login');
  };
  return (
    <View>
      <Text>My Profile</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}