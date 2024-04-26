import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessListByCategory from "../Screens/BusinessListByCategory/BusinessListByCategory";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import BusinessDetailScreen from "../Screens/BusinessDetailScreen/BusinessDetailScreen";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Business-list" component={BusinessListByCategory} />
      <Stack.Screen name="Business-detail" component={BusinessDetailScreen} />
    </Stack.Navigator>
  );
}
