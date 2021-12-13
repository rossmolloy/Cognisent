import React, { useState, useEffect } from "react";
import MapView, { Circle } from "react-native-maps";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";

function Geofence({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

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
      <Text>{text}</Text>
      <MapView style={styles.map} initialRegion={region}>
        <Circle center={{ latitude: 53, longitude: 9 }} radius={100} />
      </MapView>
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
});

export default Geofence;
