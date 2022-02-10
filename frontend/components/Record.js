import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const Record = () => {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState({ uri: "no recording yet..." });
  const [buttonColour, setButtonColour] = useState("white");

  const requestCameraPermissions = async () => {
    let { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return;
    }
  };

  const requestMicrophonePermissions = async () => {
    let { status } = await Camera.requestMicrophonePermissionsAsync();
    if (status !== "granted") {
      return;
    }
  };

  const startRecording = async () => {
    if (camera) {
      let video = await camera.recordAsync();
      if (video) {
        setText({ uri: video.uri });
      }
    }
  };

  useEffect(() => {
    requestCameraPermissions();
    requestMicrophonePermissions();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <FocusAwareStatusBar barStyle="light-content" />
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={facing}
            ref={(r) => {
              setCamera(r);
            }}
          >
            <Text
              style={{
                flex: 1,
                color: "white",
                fontSize: 10,
                justifyContent: "flex-end",
              }}
            >
              {text.uri}
            </Text>
          </Camera>
          <View style={styles.buttonsContainer}>
            <View style={styles.recordContainer}>
              <TouchableOpacity
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 75,
                  backgroundColor: buttonColour,
                }}
                onPress={() => {
                  setRecording(!recording);
                  if (recording) {
                    setButtonColour("red");
                    startRecording();
                  } else {
                    setButtonColour("white");
                    camera.stopRecording();
                  }
                }}
              />
            </View>
            <View style={styles.flipContainer}>
              <TouchableOpacity
                onPress={() => {
                  setFacing(
                    facing === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
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
};

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

export default Record;
