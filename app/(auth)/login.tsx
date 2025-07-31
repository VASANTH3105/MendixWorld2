import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  I18nManager,
  Linking,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// --- Placeholder SVGs ---
const RapidLogoSvg = () => <Text style={styles.logo}>MXWorld</Text>;
const OTPLogoSvg = () => <Text style={styles.icon}>OTP</Text>;
const MicrosoftLogoSvg = () => <Text style={styles.icon}>MSFT</Text>;

const { width: screenWidth } = Dimensions.get("window");

// --- Main Login Component ---

function Login() {
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
  const [requiredPassword, setRequiredPassword] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);
  const [miniLoader, setMiniLoader] = useState(false);
  const [isProceed, setIsProceed] = useState(false);

  const router = useRouter();

  const handleCheckEmail = (text: string) => {
    let re = /\S+@\S+\.\S+/;
    text = text.toLowerCase().trim();
    setOrganizationEmail(text);

    if (text === "") {
      setValidationEmail(true);
      setRequiredEmail(true);
    } else {
      setValidationEmail(false);
      if (re.test(text)) {
        setCheckValidEmail(false);
      } else {
        setCheckValidEmail(true);
      }
    }
  };

  const handleCheckPassword = (text: string) => {
    setPassword(text);
    if (text === "") {
      setValidationPassword(true);
      setRequiredPassword(true);
    } else {
      setValidationPassword(false);
    }
  };

  const proceed = () => {
    handleCheckEmail(organizationEmail); // Trigger validation on proceed
    if (organizationEmail === "" || checkValidEmail) {
      setRequiredEmail(true);
      setValidationEmail(true);
      return;
    }
    setMiniLoader(true);
    setTimeout(() => {
      setIsProceed(true);
      setMiniLoader(false);
    }, 1000);
  };

  const login = async () => {
    if (password === "") {
      setValidationPassword(true);
      setRequiredPassword(true);
      return;
    }
    await AsyncStorage.setItem("isLoggedIn", "true");
    router.replace("/(tabs)/home");
  };

  const openWebView = (url: any) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.mainContent}>
          <View style={styles.logoContainer}>
            <RapidLogoSvg />
          </View>
          <View style={{ alignItems: "center" }}>
            {/* <Text style={styles.title}>Login</Text> */}
            <Text style={styles.subtitle}>
              Welcome back! Please Login to your account
            </Text>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder="Email *"
              placeholderTextColor="#A0A0A0"
              value={organizationEmail}
              onChangeText={(text) => handleCheckEmail(text)}
              onBlur={() => handleCheckEmail(organizationEmail)}
              editable={!isProceed}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {validationEmail && requiredEmail && (
              <Text style={styles.textValidation}>Email ID required</Text>
            )}
            {checkValidEmail && !requiredEmail && (
              <Text style={styles.textValidation}>Email is Invalid</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password *"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={(text) => handleCheckPassword(text)}
              secureTextEntry={true}
            />
            {validationPassword && requiredPassword && (
              <Text style={styles.textValidationPassword}>
                Password required
              </Text>
            )}

            <View style={{ alignItems: "flex-end" }}>
              <Text
                onPress={() => {
                  // Navigate to Forgot Password
                }}
                style={styles.textCol2}
              >
                Forgot password?
              </Text>
            </View>
          </View>

          {!isProceed ? (
            <TouchableOpacity
              disabled={miniLoader}
              style={miniLoader ? styles.disabledLoginBtn : styles.loginBtn}
              onPress={proceed}
            >
              {miniLoader ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.loginBtnText}>Proceed</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "5%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: "4%",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#273143",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#273143",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#262626",
    marginVertical: "2%",
    textAlign: "center",
  },
  input: {
    height: 52,
    borderColor: "#ffffff99",
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#23232322",
    fontSize: 14,
    color: "#ffffff",
    marginTop: "7%",
    textAlign: "left",
  },
  loginBtn: {
    flexDirection: "row",
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: "10%",
    borderRadius: 25,
  },
  disabledLoginBtn: {
    flexDirection: "row",
    backgroundColor: "#A0A0A0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: "10%",
    borderRadius: 25,
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  textCol2: {
    textAlign: "right",
    color: "#005EEB",
    fontWeight: "400",
    fontSize: screenWidth > 320 ? 12 : 10,
    marginTop: 8,
  },
  textValidation: {
    color: "#fa183e",
    letterSpacing: 1,
    marginTop: 4,
    fontSize: 12,
    textAlign: "left",
  },
  textValidationPassword: {
    color: "#fa183e",
    letterSpacing: 1,
    marginTop: 4,
    fontSize: 12,
    textAlign: "left",
  },
  orLoginWithContainer: {
    marginVertical: "6%",
    justifyContent: "center",
    alignItems: "center",
  },
  orLoginWithText: {
    fontSize: screenWidth > 320 ? 14 : 12,
    textAlign: "center",
    color: "#A0A0A0",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialBtn: {
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    width: wp(42),
    justifyContent: "center",
    height: 44,
    borderWidth: 0.6,
    borderColor: "#E4E6E9",
    flexDirection: "row",
  },
  socialBtnText: {
    fontSize: 12,
    color: "#A0A0A0",
    fontWeight: "400",
    paddingHorizontal: "3%",
  },
  icon: {
    fontWeight: "bold",
  },
  footer: {
    marginHorizontal: "6%",
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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

export default Login;
