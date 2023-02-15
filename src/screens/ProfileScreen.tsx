import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput, Text, Avatar } from "react-native-paper";
import axios from "axios";
import { API_URL } from "../constants/Api";

export default function ProfileScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  console.log(route.params);
  const [formData, setFormData] = useState({
    name: route.params.response.user.name,
    email: route.params.response.user.email,
    location: route.params.response.user.location,
  });

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleInputChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = useCallback(async () => {
    try {
      const response = await api.put(
        "/users/update/" + route.params.response.user.id,
        {
          name: formData.name,
          email: formData.email,
          address: formData.location,
        }
      );
      console.log(response.data);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      console.log(error.response.data);
      Alert.alert("Error", "Something went wrong");
    }
  }, [formData]);

  const logout = useCallback(() => {
    try {
      // ask user to confirm logout
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const response = await api.get("/auth/signout");
            console.log(response.data);
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error: any) {
      console.log(error.response.data);
      Alert.alert("Error", "Something went wrong");
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={100} label={formData.name[0]} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Camera");
            }}
          >
            <Avatar.Icon size={30} icon="camera" style={styles.avatarIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            left={<TextInput.Icon icon="account" />}
            right={<TextInput.Icon icon="pencil" />}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            left={<TextInput.Icon icon="email" />}
            right={<TextInput.Icon icon="pencil" />}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Location"
            mode="outlined"
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => handleInputChange("location", text)}
            left={<TextInput.Icon icon="map-marker" />}
            right={<TextInput.Icon icon="pencil" />}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.UpdateButton}>
            <TouchableOpacity onPress={handleUpdate}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.LogoutButton}>
            <TouchableOpacity onPress={logout}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
  },
  avatarContainer: {
    position: "relative",
  },
  avatarIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  avatarText: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  UpdateButton: {
    width: "100%",
    marginVertical: 10,
  },
  LogoutButton: {
    width: "100%",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#009387",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
