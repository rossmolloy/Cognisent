import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text style={styles.header}>MY ACCOUNT</Text>
      <TouchableOpacity
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "white",
          padding: 10,
          marginVertical: "0.2%",
          marginHorizontal: "3%",
          overflow: "hidden",
        }}
      >
        <Text style={styles.title}>Change Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>Change Email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: "white",
          padding: 10,
          marginVertical: "0.2%",
          marginHorizontal: "3%",
        }}
      >
        <Text style={styles.title}>Change Password</Text>
      </TouchableOpacity>

      <Text style={styles.header}>MY SAFE AREA</Text>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          padding: 10,
          marginVertical: "0.2%",
          marginHorizontal: "3%",
        }}
        onPress={() => navigation.navigate("SetupScreen")}
      >
        <Text style={styles.title}>Change Safe Area</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          padding: 10,
          marginVertical: "10%",
          marginHorizontal: "3%",
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.title}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  header: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: "3%",
    marginLeft: "3%",
    paddingTop: "4%",
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: "0.2%",
    marginHorizontal: "3%",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default Settings;
