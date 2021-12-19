import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const GeofenceConfig = () => {
  const [location, setLocation] = useState(null);
  const [locationFound, setLocationFound] = useState(false);
  const [radius, setRadius] = useState(100);

  const requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
  };

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
    setLocationFound(true);
  };

  useEffect(() => {
    requestPermissions();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Modal animationType="slide" transparent={true} visible={!locationFound}>
        <View style={styles.centreModal}>
          <View style={styles.modal}>
            <Text>Getting current location...</Text>
          </View>
        </View>
      </Modal>
      <Text style={styles.text}>Add Safe Area</Text>
      {!locationFound && <MapView style={styles.map} />}
      {locationFound && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Circle
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            radius={radius}
            strokeWidth={2}
            strokeColor="red"
          />
          <Marker
            draggable
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            onDragEnd={(updatedMarker) =>
              setLocation({
                coords: {
                  latitude: updatedMarker.nativeEvent.coordinate.latitude,
                  longitude: updatedMarker.nativeEvent.coordinate.longitude,
                },
              })
            }
          />
        </MapView>
      )}
      <Slider
        style={styles.slider}
        minimumValue={10}
        value={radius}
        maximumValue={10000}
        step={10}
        minimumTrackTintColor="white"
        maximumTrackTintColor="black"
        onValueChange={(value) => setRadius(value)}
      />
      <Text>{radius} m</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  map: {
    width: 375,
    height: 500,
  },
  slider: {
    width: 250,
    height: 50,
  },
  centreModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(50, 50, 50, 0.7)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 40,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
});

export default GeofenceConfig;
