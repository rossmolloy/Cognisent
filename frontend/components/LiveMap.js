import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import FocusAwareStatusBar from "./FocusAwareStatusBar";

const LiveMap = ({ name }) => {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState(null);
  const [locationFound, setLocationFound] = useState(false);
  const [addressFound, setAddressFound] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const registerForPushNotifications = async () => {
    if (Device.isDevice) {
      let { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    }
  };

  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Location Update!",
        body: name + " is at " + address.name + ".",
      },
      trigger: { seconds: 1 },
    });
  }

  const startLocationUpdates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

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
    startLocationUpdates();
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (locationFound) {
      const timer = setTimeout(() => {
        getAddressFromCoords(location.coords);
      }, 1000);
      return () => clearTimeout(timer);
    }
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
      <View style={styles.textView}>
        <Text style={styles.text}>You are at</Text>
        {!addressFound && (
          <Text style={styles.address}>Finding Location...</Text>
        )}
        {addressFound && <Text style={styles.address}>{address.name}</Text>}
      </View>
      {addressFound && (
        <Button
          title="Send Notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
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
