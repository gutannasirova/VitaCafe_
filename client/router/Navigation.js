import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Импортируем экраны
import WelcomeScreen from "../screens/Main";// Новый экран (первый экран)
import LoginScreen from "../screens/LoginScreen";; // Пример другого экрана

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Первый экран */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Скрываем заголовок
        />
        {/* Второй экран */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Вход" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}