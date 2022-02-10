import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Record from "../components/Record";
import LiveMap from "../components/LiveMap";
import Settings from "../components/Settings";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <Tab.Navigator
        screenOptions={{
          showIcon: true,
          tabBarActiveTintColor: "red",
          tabBarStyle: { height: "13%", paddingBottom: "11%" },
        }}
      >
        <Tab.Screen
          name="Location"
          component={LiveMap}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require("../assets/home.png")}
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={Record}
          options={{
            headerShown: false,
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
            headerShown: true,
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
};

export default HomeScreen;
