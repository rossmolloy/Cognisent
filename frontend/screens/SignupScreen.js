import React, { useEffect, useState } from "react";
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
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [contact3, setContact3] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(false);

  const signupHandler = async () => {
    try {
      const response = await fetch(
        "http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/signup",
        {
          method: "POST",
          body: JSON.stringify({
            phone: phone,
            fullName: fullName,
            password: password,
            contact1: contact1,
            contact2: contact2,
            contact3: contact3,
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
      setSignedUp(true);
    } catch (exception) {
      setError(true);
      setSignedUp(false);
    }
  };

  useEffect(() => {
    if (signUp) {
      signupHandler();
      setSignUp(false);
    }
  }, [signUp]);

  useEffect(() => {
    if (signedUp) {
      navigation.replace("SetupScreen", { phone: phone });
    }
  }, [signedUp]);

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
            placeholder="Phone Number"
            placeholderTextColor="grey"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
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
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact #1"
            placeholderTextColor="grey"
            value={contact1}
            onChangeText={setContact1}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact #2"
            placeholderTextColor="grey"
            value={contact2}
            onChangeText={setContact2}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact #3"
            placeholderTextColor="grey"
            value={contact3}
            onChangeText={setContact3}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSignUp(true)}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {error && (
          <View style={{ alignItems: "center" }}>
            <Text>Error, could not complete signup.</Text>
          </View>
        )}
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
