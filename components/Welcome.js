import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <MapView style={styles.map} />
      <Text
        style={{ color: "red", fontSize: 20, paddingTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Log out
      </Text>
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
    borderRadius: "10%",
  },
});

export default Welcome;
