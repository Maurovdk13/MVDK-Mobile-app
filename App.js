import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import BlogDetailsScreen from "./screens/BlogDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#E8DFD1",
          },
          headerShadowVisible: false,
          headerTintColor: "#3F3328",
          headerTitleStyle: {
            color: "#3F3328",
            fontWeight: "700",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="BlogDetails"
          component={BlogDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
