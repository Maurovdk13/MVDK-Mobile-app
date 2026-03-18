import React from "react";
import { StatusBar } from "expo-status-bar";
import {} from "react-native";

import ProductCard from "./components/ProductCard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tack = createNativeStackNavigator();

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";

export default function App() {

  return (
    <NavigationContainer>
      <tack.Navigator>
        <tack.Screen name="Home" component={HomeScreen} />
        <tack.Screen name="Details" component={ProductDetail}/>
      </tack.Navigator>
      </NavigationContainer>

  );
}