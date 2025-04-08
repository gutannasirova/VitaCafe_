import React from 'react';
import LoginScreen from './screens/LoginScreen';
import Main from './App';

import  { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
    return < NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen 
    name="Main"
    component={Main}
    options={{title: 'Главная'}}
    />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
}
