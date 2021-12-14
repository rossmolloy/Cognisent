import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            Cognisent
            {"\n"}
          </Text>
          <Text style={styles.baseText}>Stay Safe</Text>
        </Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "white" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.register}>
        <Text style={{ color: "grey" }}>Have an account? </Text>
        <Text
          style={{ color: "red" }}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  tinyLogo: {
    height: 250,
    width: 250,
  },
  logo: {
    height: 250,
    width: 250,
  },
  baseText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    color: "red",
    fontSize: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    borderColor: "#e8e8e8",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff3333",
    padding: 10,
    borderRadius: 5,
    width: 350,
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
  },
});

export default Signup;
