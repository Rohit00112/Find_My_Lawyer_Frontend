import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { IconButton, Snackbar } from "react-native-paper";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/Api";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProp } from "../navigation/types";

export default function LoginScreen() {
  const navigation = useNavigation<AuthStackNavProp>();
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

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/signin", formData);
      console.log(response.data);
      setsnackbar({
        message: "Login successful",
        visible: true,
      });
      navigation.navigate("Home");
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome Back!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <EvilIcons
            name="envelope"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <EvilIcons name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={!passwordVisible}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <IconButton
            icon={passwordVisible ? "eye" : "eye-off"}
            size={20}
            onPress={handlePasswordVisibility}
          />
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
    paddingVertical: 42,
    marginTop: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  icon: {
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
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
});
