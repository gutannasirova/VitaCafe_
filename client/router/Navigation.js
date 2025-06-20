import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/Main";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUp";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import OrderScreen from "../screens/Making";
import CartScreen from "../screens/CartScreen";
import MenuScreen from "../screens/MenuScreen";
import AddressScreen from "../screens/Address";
import CardScreen from "../screens/Cards";
import ProfileScreen from "../screens/ProfileScreen";
import OrderConfirmation from "../screens/Makin";


import BottomTabNavigator from "../router/navigate";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // убираем везде шапку
        // animationEnabled: true, // включаем анимацию
        // gestureEnabled: true, // свайп назад на iOS/Android
        // animation: 'default', // стиль анимации
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      {/* После успешного входа сразу открываем Main (ТАБЫ) */}
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
      />
      <Stack.Screen
        name="Addresses"
        component={AddressScreen}
      />
      <Stack.Screen
        name="Cards"
        component={CardScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmation}
      />

    </Stack.Navigator>
  );
}
