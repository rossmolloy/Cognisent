import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Welcome from "./Welcome";
import Geofence from "./Geofence";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showIcon: true,
        tabBarActiveTintColor: "red",
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
              style={{ height: 25, width: 25 }}
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
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Home;
