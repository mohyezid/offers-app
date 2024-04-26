import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../utils/Colors";

export default function BusinessListItem({ business }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />

      <View style={styles.infocontainer}>
        <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
          {business?.name}
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "outfit" }}>
          {business?.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            padding: 3,
            color: Colors.primary,
            backgroundColor: "#EDEDED",
            borderRadius: 3,
            alignSelf: "flex-start",
            paddingHorizontal: 7,
          }}
        >
          {business?.category?.name}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  infocontainer: {
    padding: 7,
    display: "flex",
    gap: 3,
  },
});
