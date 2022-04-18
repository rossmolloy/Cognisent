import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SafeAreaConfig from "../components/SafeAreaConfig";

const SetupScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <SafeAreaConfig phone={route.params.phone} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default SetupScreen;
