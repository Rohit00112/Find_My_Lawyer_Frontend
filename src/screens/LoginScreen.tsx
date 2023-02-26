import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { TextInput, Snackbar } from "react-native-paper";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/Api";
import * as webBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

webBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [accessToken, setAccessToken] = useState<any>(null);
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Client",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [snackbar, setsnackbar] = useState({
    message: "",
    visible: false,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "757081817359-v5b9kr1793b0tskui8igb6us4gjk48ma.apps.googleusercontent.com",
    androidClientId:
      "757081817359-a8qc6b5ol9kfff7pn0g92aipp59gu99s.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication?.accessToken);
    }
  }, [response]);

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/signin", formData);
      setsnackbar({
        message: "Login successful",
        visible: true,
      });
      console.log(response.data.user.role);
      if (response.data.user.role === "Client") {
        navigation.navigate("HomeMain", {
          screen: "HomeScreenr",
          response: response.data.user,
        });
      }
      if (response.data.user.role === "Lawyer") {
        navigation.navigate("LawyerHome");
      }
    } catch (error: any) {
      console.log(error.response.data);
      setsnackbar({
        message: "Login failed",
        visible: true,
      });
    }
  };

  const handleInputChange = (name: any, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOnDismissSnackBar = () => {
    setsnackbar({
      ...snackbar,
      visible: false,
    });
  };

  const fetchUserInfo = async () => {
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",

      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      console.log(data);
    });
  };

  const handleGoogleLogin = async () => {
    try {
      promptAsync();
      fetchUserInfo();

      navigation.navigate("HomeMain", {
        screen: "HomeScreenr",
        response: userInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome Back!</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("email", text)}
            left={<TextInput.Icon icon="email" color="#000" />}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Your Password"
            secureTextEntry={!passwordVisible}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("password", text)}
            left={<TextInput.Icon icon="lock" color="#000" />}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                color="#000"
                onPress={handlePasswordVisibility}
              />
            }
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signinContainer}>
          <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
            <Text style={styles.signinText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={[styles.line, { flex: 1, alignSelf: "center" }]} />
          <Text style={{ color: "#000", marginHorizontal: 10 }}>OR</Text>
          <View style={[styles.line, { flex: 1, alignSelf: "center" }]} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
          >
            <EvilIcons name="sc-facebook" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#dd4b39" }]}
            disabled={!request}
            onPress={() => handleGoogleLogin()}
          >
            <EvilIcons name="sc-google-plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.SignUpContainer}>
          <Text style={{ color: "#000" }}>Don't have an account? {""}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#009387", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={snackbar.visible}
        onDismiss={handleOnDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            handleOnDismissSnackBar();
          },
        }}
      >
        {snackbar.message}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    marginTop: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 57,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },

  action: {
    flexDirection: "row",
    marginTop: 30,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    width: "100%",
  },
  signinContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  signinButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#009387",
  },
  signinText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#009387",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#000",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 20,
    borderRadius: 10,
  },
  SignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#009387",
    fontSize: 14,
  },
});
