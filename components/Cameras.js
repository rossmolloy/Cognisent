import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";

function Cameras() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default Cameras;
