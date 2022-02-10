import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GeofenceConfig from "../components/GeofenceConfig";

const SetupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <GeofenceConfig />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.text}>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 5,
    height: "6%",
    width: "40%",
    marginTop: "5%",
  },
  text: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SetupScreen;
