import { Tabs } from "expo-router";
import { TouchableWithoutFeedback, View } from "react-native";
import {
  Home2,
  Profile,
  Profile2User,
  MessageProgramming,
} from "iconsax-react-native";

const tabScreenOptions = ({ route }: any) => ({
  headerShown: false,
  tabBarShowLabel: true,
  tabBarStyle: {
    height: 68,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    backgroundColor: "#ffffff",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 10,
  },
  tabBarButton: (props: any) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={props.style}>{props.children}</View>
    </TouchableWithoutFeedback>
  ),
  tabBarIcon: ({ focused, color, size }: any) => {
    const variant = focused ? "Bold" : "Linear";
    if (route.name === "home")
      return <Home2 color={color} size={size} variant={variant} />;
    else if (route.name === "profile")
      return <Profile color={color} size={size} variant={variant} />;
    else if (route.name === "courses")
      return <Profile2User color={color} size={size} variant={variant} />;
    else if (route.name === "codebits")
      return <MessageProgramming color={color} size={size} variant={variant} />;
  },
  tabBarActiveTintColor: "#15202b",
  tabBarInactiveTintColor: "#a6a6a6",
});

export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="courses" options={{ title: "Courses" }} />
      <Tabs.Screen name="codebits" options={{ title: "Code Bits" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
