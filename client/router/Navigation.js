import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Импортируем экраны
import WelcomeScreen from "../screens/Main"; // Приветственный экран
import LoginScreen from "../screens/LoginScreen"; // Экран входа
import HomeScreen from "../screens/HomeScreen"; // Главная страница после входа
import SignUpScreen from "../screens/SignUp"; // Экран регистрации

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Первый экран: Приветственный экран */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        {/* Второй экран: Экран входа */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Вход" }}
        />
        {/* Третий экран: Главная страница */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Главная" }}
        />
        {/* Четвертый экран: Регистрация */}
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Регистрация" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}