import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

function Welcome({ navigation }) {
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
      <Text style={styles.text}>Welcome!</Text>
      <Text>Updated: {count} times</Text>
      {!locationFound && <MapView style={styles.map} />}
      {locationFound && (
        <MapView
          style={styles.map}
          region={{
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
      {addressFound && <Text style={{ fontSize: 30 }}>{address.name}</Text>}
      <Text
        style={{ color: "red", fontSize: 20, paddingTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Log out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
});

export default Welcome;
