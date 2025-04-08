
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const icons = {
  "Главная": "home",
  "Корзина": "shopping-bag",
  "Меню": "list",
  "Аккаунт": "user",
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarBackground} />
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tabButton, isFocused ? styles.activeTab : null]}
            >
              <Feather 
                name={icons[route.name]} 
                size={24} 
                color={isFocused ? "#C4F39C" : "black"} 
              />
              <Text style={[styles.tabText, isFocused && { fontWeight: "bold", color: "black" }]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Корзина" component={CartScreen} />
        <Tab.Screen name="Меню" component={MenuScreen} />
        <Tab.Screen name="Аккаунт" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBarBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 85,
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#C0F296",
    borderRadius: 30,
    bottom: 8,
    height: 70,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: "#A0E087",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
  },
});

export default BottomTabNavigator;
