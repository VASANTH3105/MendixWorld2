// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthLayout() {
  const openWebView = (url: any) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <LinearGradient
        colors={["#007cf0", "#53acffff", "#8dc8ffff", "#53acffff", "#007cf0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: styles.container,
            }}
          />
        </View>
      </LinearGradient>
      <View style={styles?.bottomContainer}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you confirm that you have reviewed and agree to our
            <Text
              onPress={() =>
                openWebView("https://www.rapidhr.com/terms-and-conditions/")
              }
              style={styles.linkText}
            >
              {" "}
              Terms & Agreement
            </Text>
            {" and "}
            <Text
              onPress={() =>
                openWebView("https://www.rapidhr.com/privacy-policy-2/")
              }
              style={styles.linkText}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: "5%",
    // paddingTop: 10,
    // marginBottom: '10%',
    backgroundColor: "transparent", // so gradient is visible
  },
  bottomContainer: {
    backgroundColor: "#000000",
  },
  footer: {
    marginHorizontal: "6%",
    paddingVertical: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#949494",
    textAlign: "center",
  },
  linkText: {
    color: "#0077CC",
    fontSize: 10,
  },
});
