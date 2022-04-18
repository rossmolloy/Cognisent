import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Record from "../components/Record";
import LiveMap from "../components/LiveMap";
import Settings from "../components/Settings";
import User from "../components/User";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ route }) => {
  const [user, setUser] = useState({});

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `http://ec2-***-***-***-***.compute-1.amazonaws.com:8000/user/${route.params.phone}`,
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
      setUser({
        phone: user.phone,
        fullName: user.fullName,
        contacts: [user.contact1, user.contact2, user.contact3],
      });
    } catch (exception) {
      setUser({
        phone: route.params.phone,
        fullName: "N/A",
        contacts: ["N/A"],
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          children={() => <LiveMap name={user.fullName} />}
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
          name="User"
          children={() => <User user={user} />}
          options={{
            headerShown: true,
            tabBarIcon: () => (
              <Image
                source={require("../assets/user.png")}
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          children={() => <Settings phone={route.params.phone} />}
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
