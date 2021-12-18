import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Cameras() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);

  const getCameraPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
  };

  useEffect(() => {
    getCameraPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <FocusAwareStatusBar barStyle="light-content" />
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={facing} />
          <View style={styles.buttonsContainer}>
            <View style={styles.recordContainer}>
              <TouchableOpacity style={styles.record} />
            </View>
            <View style={styles.flipContainer}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/flip.png")}
                  style={{ height: 25, width: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  recordContainer: {
    flex: 0.62,
    alignItems: "flex-end",
  },
  record: {
    height: 75,
    width: 75,
    borderRadius: 75,
    backgroundColor: "red",
  },
  flipContainer: {
    flex: 0.38,
    alignItems: "flex-end",
    paddingRight: "5%",
    paddingBottom: "5%",
  },
  flip: {
    height: 25,
    width: 25,
  },
});

export default Cameras;
