import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
export default function PageHeading({ title }) {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        nav.goBack();
      }}
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons name="arrow-back" size={30} color="black" />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
