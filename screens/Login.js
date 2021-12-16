import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#ff3333" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://static.thenounproject.com/png/8353-200.png",
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>
              Cognisent
              {"\n"}
            </Text>
            <Text style={styles.baseText}>Stay Safe</Text>
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
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
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.register}>
          <Text style={{ color: "white" }}>Don't have an account? </Text>
          <Text
            style={{ color: "black" }}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "white",
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
    backgroundColor: "black",
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

export default Login;
