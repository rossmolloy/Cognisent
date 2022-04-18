import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const Settings = ({ phone }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text style={styles.header}>MY ACCOUNT:</Text>
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
        onPress={() =>
          navigation.navigate("UpdateScreen", {
            phone: phone,
            updating: "Name",
          })
        }
      >
        <Text style={styles.title}>Change Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("UpdateScreen", {
            phone: phone,
            updating: "Password",
          })
        }
      >
        <Text style={styles.title}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("UpdateScreen", {
            phone: phone,
            updating: "Contact #1",
          })
        }
      >
        <Text style={styles.title}>Change Contact #1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("UpdateScreen", {
            phone: phone,
            updating: "Contact #2",
          })
        }
      >
        <Text style={styles.title}>Change Contact #2</Text>
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
        onPress={() =>
          navigation.navigate("UpdateScreen", {
            phone: phone,
            updating: "Contact #3",
          })
        }
      >
        <Text style={styles.title}>Change Contact #3</Text>
      </TouchableOpacity>

      <Text style={styles.header}>MY SAFE AREA:</Text>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          padding: 10,
          marginVertical: "0.2%",
          marginHorizontal: "3%",
        }}
        onPress={() => navigation.replace("SetupScreen", { phone: phone })}
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
        onPress={() => navigation.replace("LoginScreen")}
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
