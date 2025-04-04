import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image, View, Text, StyleSheet } from "react-native";

import HomeScreen from "./HomeScreen";
import MenuScreen from "./MenuScreen";
import BasketScreen from "./CartScreen";
import ProfileScreen from "./ProfileScreen";

import homeIcon from "./assets/home.png";
import cartIcon from "./assets/cart.png";
import menuIcon from "./assets/menu.png";
import userIcon from "./assets/User.png";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
