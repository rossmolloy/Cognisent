import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Settings() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text style={styles.text}>Settings!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default Settings;
