import React from "react";
import { StyleSheet, Text, View } from "react-native";
// react-native-paper
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button mode="elevated" onPress={() => console.log("Pressed")}>
        Press me
      </Button>
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
