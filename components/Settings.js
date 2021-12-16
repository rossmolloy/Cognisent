import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text>Settings!</Text>
    </SafeAreaView>
  );
}

export default Settings;
