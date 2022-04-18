import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "../components/FocusAwareStatusBar";

const UpdateScreen = ({ route, navigation }) => {
  const [input, setInput] = useState("");
  const [update, setUpdate] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);

  const updateUser = async (body) => {
    try {
      const response = await fetch(
        `http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/update/${route.params.phone}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      setError(false);
      setUpdated(true);
    } catch (exception) {
      setError(true);
      setUpdated(false);
    }
  };

  useEffect(() => {
    if (update) {
      if (
        (input === "" && route.params.updating === "Name") ||
        (input === "" && route.params.updating === "Password") ||
        (input === "" && route.params.updating === "Contact #1")
      ) {
        setError(true);
      } else {
        let body = {};
        switch (route.params.updating) {
          case "Name":
            body = { fullName: input };
            break;
          case "Password":
            body = { password: input };
            break;
          case "Contact #1":
            body = { contact1: input };
            break;
          case "Contact #2":
            body = { contact2: input };
            break;
          case "Contact #3":
            body = { contact3: input };
            break;
          default:
            break;
        }

        updateUser(body);
      }

      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    if (updated) {
      navigation.replace("HomeScreen", { phone: route.params.phone });
    }
  }, [updated]);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text style={styles.text}>Update {route.params.updating}</Text>
      <TextInput
        style={styles.input}
        placeholder={route.params.updating}
        placeholderTextColor="grey"
        value={input}
        onChangeText={setInput}
        backgroundColor="white"
      />
      {error && (
        <Text style={{ marginTop: 15 }}>
          Error, could not update {route.params.updating.toLowerCase()}.
        </Text>
      )}
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={styles.button} onPress={() => setUpdate(true)}>
          <Text style={{ color: "white" }}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 350,
    borderRadius: 5,
    marginTop: 20,
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 350,
  },
});

export default UpdateScreen;
