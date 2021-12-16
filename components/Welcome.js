import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.text}>Welcome!</Text>
        <MapView style={styles.map} />
        <Text
          style={{ color: "red", fontSize: 20, paddingTop: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          Log out
        </Text>
      </SafeAreaView>
    </View>
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
  map: {
    width: "75%",
    height: "30%",
    borderRadius: 10,
  },
});

export default Welcome;
