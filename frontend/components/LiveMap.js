import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const LiveMap = () => {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState(null);
  const [locationFound, setLocationFound] = useState(false);
  const [addressFound, setAddressFound] = useState(false);
  const [count, setCount] = useState(0);

  const requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
  };

  const startLocationUpdates = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
      },
      (updatedLocation) => {
        setLocation(updatedLocation);
        if (!locationFound) {
          setLocationFound(true);
        }
        setCount((i) => i + 1);
      }
    );
  };

  const getAddressFromCoords = async () => {
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setAddress(address[0]);
    if (!addressFound) {
      setAddressFound(true);
    }
  };

  useEffect(() => {
    requestPermissions();
    startLocationUpdates();
  }, []);

  useEffect(() => {
    getAddressFromCoords(location.coords);
  }, [location]);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      {!locationFound && <MapView style={styles.map} />}
      {locationFound && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
      <Text>Updated: {count} times</Text>
      {addressFound && (
        <View style={styles.textView}>
          <Text style={styles.text}>You are at</Text>
          <Text style={styles.address}>{address.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textView: {
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  address: {
    fontSize: 25,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "85%",
    borderRadius: 10,
  },
});

export default LiveMap;
