import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./router/Navigation";
import { CartProvider } from "./router/CartContext"; 

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}