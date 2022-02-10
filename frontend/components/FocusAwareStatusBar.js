// Source: https://reactnavigation.org/docs/status-bar/

import React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
