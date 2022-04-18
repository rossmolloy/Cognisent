import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const SafeAreaConfig = ({ phone }) => {
  const [location, setLocation] = useState(null);
  const [noSavedLocation, setNoSavedLocation] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [radius, setRadius] = useState(100);

  const navigation = useNavigation();

  const getSafeArea = async () => {
    try {
      const response = await fetch(
        `http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/user/${phone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const user = await response.json();
      if (user.hasOwnProperty("radius") && user.hasOwnProperty("location")) {
        setLocation({
          coords: {
            latitude: user.location.latitude,
            longitude: user.location.longitude,
          },
        });
        setRadius(user.radius);
        setLocationFound(true);
      } else {
        setNoSavedLocation(true);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const updateSafeArea = async (body) => {
    try {
      const response = await fetch(
        `http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/update/${phone}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      setUpdated(true);
    } catch (exception) {
      setUpdated(false);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
    setLocationFound(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSafeArea();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (update) {
      const body = {
        radius: radius,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };

      updateSafeArea(body);
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    if (updated) {
      navigation.replace("HomeScreen", { phone: phone });
    }
  }, [updated]);

  useEffect(() => {
    if (noSavedLocation) {
      getLocation();
    }
  }, [noSavedLocation]);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Modal animationType="slide" transparent={true} visible={!locationFound}>
        <View style={styles.centreModal}>
          <View style={styles.modal}>
            <Text>Getting location...</Text>
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
      <TouchableOpacity style={styles.button} onPress={() => setUpdate(true)}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 5,
    height: "6%",
    width: 150,
    marginTop: "5%",
  },
  buttonText: {
    color: "white",
    justifyContent: "center",
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

export default SafeAreaConfig;
