import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Cameras() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <FocusAwareStatusBar barStyle="light-content" />
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={facing} />
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
});

export default Cameras;
