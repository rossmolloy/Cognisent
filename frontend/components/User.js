import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const User = ({ user }) => {
  const [contact2, setContact2] = useState(false);
  const [contact3, setContact3] = useState(false);

  useEffect(() => {
    if (user.contacts[1]) {
      setContact2(true);
    }

    if (user.contacts[2]) {
      setContact3(true);
    }
  }, []);

  return (
    <View>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/usericon.png")}
        />
        <View style={{ marginLeft: 30 }}>
          <Text style={styles.nameText}>{user.fullName}</Text>
          <Text style={styles.phoneText}>{user.phone}</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Divider />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.subheader}>Contacts</Text>
        <View>
          <Text style={styles.contactText}>Contact #1: </Text>
          <Text style={styles.infoText}>Phone: {user.contacts[0]}</Text>
        </View>
        {contact2 && (
          <View>
            <Text style={styles.contactText}>Contact #2: </Text>
            <Text style={styles.infoText}>Phone: {user.contacts[1]}</Text>
          </View>
        )}
        {contact3 && (
          <View>
            <Text style={styles.contactText}>Contact #3: </Text>
            <Text style={styles.infoText}>Phone: {user.contacts[2]}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    overflow: "hidden",
    borderColor: "black",
    marginLeft: 20,
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  phoneText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#505050",
  },
  subheader: {
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 20,
    marginBottom: 15,
  },
  contactText: {
    fontWeight: "bold",
    color: "#505050",
    fontSize: 18,
    marginLeft: 20,
  },
  infoText: {
    marginLeft: 50,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default User;
