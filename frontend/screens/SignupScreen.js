import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  // const signupHandler = () => {
  //   fetch("http://IPADDRESS:8000/signup", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: email,
  //       fullName: fullName,
  //       password: password,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "#ff3333" }}>
      <FocusAwareStatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.nameView}>
          <Text style={styles.text}>
            <Text style={styles.title}>Cognisent</Text>
          </Text>
          <Text style={styles.text}>Stay Safe</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="grey"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry="true"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} /* onPress={signupHandler} */>
            <Text style={{ color: "white" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login}>
          <Text style={{ color: "white" }}>Have an account? </Text>
          <Text
            style={{ color: "black" }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Log in
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: 50,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    borderColor: "#e8e8e8",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 350,
  },
  login: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "8%",
  },
});

export default SignupScreen;
