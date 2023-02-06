import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProp } from "../navigation/types";

export default function ProfileScreen() {
  const navigation = useNavigation<AuthStackNavProp>();

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
