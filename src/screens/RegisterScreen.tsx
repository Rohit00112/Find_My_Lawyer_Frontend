import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { IconButton, RadioButton, Snackbar } from "react-native-paper";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import { API_URL } from "../constants/Api";
import SpecializationDropDown from "../components/DropDown";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProp } from "../navigation/types";

export default function RegisterScreen() {
  const navigation = useNavigation<AuthStackNavProp>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "Client",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [snackbar, setsnackbar] = useState({
    message: "",
    visible: false,
  });

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleRegister = useCallback(async () => {
    try {
      const response = await api.post("/auth/signup", formData);
      console.log(response.data);
      setsnackbar({
        message: "Registration successful",
        visible: true,
      });
      navigation.navigate("Login");
    } catch (error: any) {
      console.log(error.response.data);
      setsnackbar({
        message: "Registration failed",
        visible: true,
      });
    }
  }, [api, formData, navigation]);

  const handleInputChange = (name: any, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const facebookLogin = () => {
    console.log("Facebook Login");
  };

  const googleLogin = () => {
    console.log("Google Login");
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
        <Text style={styles.text_header}>Register Now!</Text>
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
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Name</Text>
        <View style={styles.action}>
          <EvilIcons name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Your Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>Role</Text>
        <View style={styles.action}>
          <RadioButton.Group
            onValueChange={(value) => handleInputChange("role", value)}
            value={formData.role}
          >
            <View style={styles.radioGroup}>
              <View style={styles.radio}>
                <Text>Client</Text>
                <RadioButton value="Client" />
              </View>
              <View style={styles.radio}>
                <Text>Lawyer</Text>
                <RadioButton value="Lawyer" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        {formData.role === "Lawyer" && <SpecializationDropDown />}
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleRegister}>
            <Text style={[styles.textSign, { color: "#fff" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={[styles.line, { flex: 1, alignSelf: "center" }]} />
          <Text style={{ flex: 1, textAlign: "center", alignSelf: "center" }}>
            OR
          </Text>
          <View style={[styles.line, { flex: 1, alignSelf: "center" }]} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={facebookLogin}
            style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
          >
            <EvilIcons name="sc-facebook" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={googleLogin}
            style={[styles.socialButton, { backgroundColor: "#db3236" }]}
          >
            <EvilIcons name="sc-google-plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={snackbar.visible}
        onDismiss={handleOnDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            // Do something
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
    marginTop: 20,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  icon: {
    marginTop: 5,
    fontSize: 25,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
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

  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    color: "#009387",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    height: 50,
    width: "100%",
  },
  radio: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
});