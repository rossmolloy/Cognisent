import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Geofence from "../components/Geofence";

function Setup({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Geofence navigation={navigation} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff3333",
  },
});

export default Setup;
