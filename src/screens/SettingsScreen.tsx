import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Appbar, Avatar, TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function SettingsScreen() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    profilePicture: "https://picsum.photos/200",
    phoneNumber: "+1234567890",
    bio: "I'm a software engineer and I love to code!",
  });

  const translateY = useRef(new Animated.Value(50)).current;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Save user profile changes
    setEditMode(false);
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" onPress={() => {}} />
          <Appbar.Content title="Profile" />
          <Appbar.Action
            icon={editMode ? "close" : "pencil"}
            onPress={toggleEditMode}
          />
        </Appbar.Header>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Avatar.Image source={{ uri: user.profilePicture }} size={100} />
            {editMode && (
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.infoContainer}>
            <TextInput
              label="First Name"
              value={user.firstName}
              editable={editMode}
              onChangeText={(text) => setUser({ ...user, firstName: text })}
              style={styles.input}
              underlineColor="#67aaf9"
              theme={{ colors: { primary: "#67aaf9" } }}
            />
            <TextInput
              label="Last Name"
              value={user.lastName}
              editable={editMode}
              onChangeText={(text) => setUser({ ...user, lastName: text })}
              style={styles.input}
              underlineColor="#67aaf9"
              theme={{ colors: { primary: "#67aaf9" } }}
            />
            <TextInput
              label="Email"
              value={user.email}
              editable={editMode}
              onChangeText={(text) => setUser({ ...user, email: text })}
              style={styles.input}
              underlineColor="#67aaf9"
              theme={{ colors: { primary: "#67aaf9" } }}
            />
            <TextInput
              label="Phone Number"
              value={user.phoneNumber}
              editable={editMode}
              onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
              style={styles.input}
              underlineColor="#67aaf9"
              theme={{ colors: { primary: "#67aaf9" } }}
            />
            <TextInput
              label="Bio"
              value={user.bio}
              editable={editMode}
              onChangeText={(text) => setUser({ ...user, bio: text })}
              style={styles.input}
              underlineColor="#67aaf9"
              theme={{ colors: { primary: "#67aaf9" } }}
            />
          </View>
        </View>
        {editMode && (
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            labelStyle={styles.saveButtonLabel}
          >
            Save
          </Button>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  profileContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  changeAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#67aaf9",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#c8c8c8",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#67aaf9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  saveButtonLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    color: "#c8c8c8",
    marginBottom: 5,
  },
});

export default SettingsScreen;
