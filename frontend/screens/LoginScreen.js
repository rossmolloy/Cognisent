import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  const loginHandler = async () => {
    try {
      const response = await fetch(
        "http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/login",
        {
          method: "POST",
          body: JSON.stringify({
            phone: phone,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      setError(false);
      setLoggedIn(true);
    } catch (exception) {
      setError(true);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if (login) {
      loginHandler();
      setLogin(false);
    }
  }, [login]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      navigation.replace("HomeScreen", { phone: phone });
    }
  }, [loggedIn]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ff3333" }}>
      <FocusAwareStatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require("../assets/wings.png")} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.text}>
            <Text style={styles.title}>Cognisent</Text>
          </Text>
          <Text style={styles.text}>Stay Safe</Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="grey"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLogin(true)}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
          {error && (
            <View style={{ alignItems: "center" }}>
              <Text>Error, could not log user in.</Text>
            </View>
          )}
        </KeyboardAvoidingView>
        <View style={styles.register}>
          <Text style={{ color: "white" }}>Don't have an account? </Text>
          <Text
            style={{ color: "black" }}
            onPress={() => navigation.navigate("SignupScreen")}
          >
            Sign up
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
  logoView: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "5%",
  },
  logo: {
    width: "50%",
    resizeMode: "contain",
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
  nameView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  register: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "8%",
  },
});

export default LoginScreen;
