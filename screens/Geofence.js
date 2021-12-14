import React, { useState, useEffect } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";

function Geofence({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [radius, setRadius] = useState(100);
  const [latLng, setLatLng] = useState({
    latitude: 53.2775,
    longitude: -9.0107,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setLatLng({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(region);
    })();
  }, []);

  let count = 0;

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    count += 1;
    text = "updated: " + count + " times, " + JSON.stringify(location);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 40, fontWeight: "bold", paddingBottom: 20 }}>
        Add safe area
      </Text>
      <MapView style={styles.map} initialRegion={region}>
        <Circle
          center={latLng}
          radius={radius}
          strokeWidth={2}
          strokeColor="red"
        />
        <Marker
          draggable
          coordinate={latLng}
          onDragEnd={(event) =>
            setLatLng({
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude,
            })
          }
        />
      </MapView>
      <Slider
        style={styles.slider}
        minimumValue={10}
        value={radius}
        maximumValue={5000}
        step={100}
        minimumTrackTintColor="white"
        maximumTrackTintColor="black"
        onValueChange={(value) => setRadius(value)}
      />
      <Text>{radius}</Text>
      <Text
        style={{ color: "red", fontSize: 20, paddingTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Log out
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  map: {
    width: 350,
    height: 500,
  },
  slider: {
    width: 250,
    height: 50,
  },
});

export default Geofence;
