import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import Geofence from "../components/Geofence";

import Welcome from "../components/Welcome";
import Cameras from "../components/Cameras";
import Settings from "../components/Settings";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          showIcon: true,
          tabBarActiveTintColor: "red",
          tabBarStyle: { height: "13%", paddingBottom: "11%" },
        }}
      >
        <Tab.Screen
          name="Welcome"
          component={Welcome}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("../assets/home.png")}
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Geofence"
          component={Geofence}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("../assets/home.png")}
                style={{ height: 25, width: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={Cameras}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("../assets/camera.png")}
                style={{ height: 25, width: 33 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("../assets/settings.png")}
                style={{ height: 25, width: 24 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default Home;
