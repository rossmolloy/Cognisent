import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Settings() {
  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Text>Settings!</Text>
      </SafeAreaView>
    </View>
  );
}

export default Settings;
