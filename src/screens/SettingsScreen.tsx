import axios from "axios";
import React, { useMemo } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { List, Switch } from "react-native-paper";
import { API_URL } from "../constants/Api";

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const [isPushNotificationOn, setIsPushNotificationOn] = React.useState(false);
  const [isEmailNotificationOn, setIsEmailNotificationOn] =
    React.useState(false);
  const onTogglePushNotification = () =>
    setIsPushNotificationOn(!isPushNotificationOn);
  const onToggleEmailNotification = () =>
    setIsEmailNotificationOn(!isEmailNotificationOn);

  const api = useMemo(() => axios.create({ baseURL: API_URL }), []);

  const handleLogout = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await api.get("/auth/signout");
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="lock" />}
            onPress={() => {}}
          />
          <List.Item
            title="Change account details"
            left={() => <List.Icon icon="account" />}
            onPress={() => {}}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={isPushNotificationOn}
                onValueChange={onTogglePushNotification}
              />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Email Notifications"
            left={() => <List.Icon icon="email" />}
            right={() => (
              <Switch
                value={isEmailNotificationOn}
                onValueChange={onToggleEmailNotification}
              />
            )}
            onPress={() => {}}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Location Services"
            left={() => <List.Icon icon="map-marker" />}
            right={() => <Switch value={false} />}
            onPress={() => {}}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Others</List.Subheader>
          <List.Item
            title="Change Language"
            left={() => <List.Icon icon="translate" />}
            onPress={() => {}}
          />
          <List.Item
            title="About"
            left={() => <List.Icon icon="information" />}
            onPress={() => {}}
          />
        </List.Section>

        <List.Section>
          {/* logout button */}
          <List.Item
            title="Logout"
            left={() => <List.Icon icon="logout" />}
            onPress={() => {
              handleLogout();
            }}
          />
        </List.Section>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
});
