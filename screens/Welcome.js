import React from "react";
import { Text, SafeAreaView } from "react-native";

function Welcome({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 50, fontWeight: "bold" }}>Welcome!</Text>
      <Text
        style={{ color: "red", fontSize: 20, paddingTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Log out
      </Text>
    </SafeAreaView>
  );
}

export default Welcome;
