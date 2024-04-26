import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItemSingle({ business, booking }) {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("Business-detail", { business: business })}
      style={styles.container}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View>
        <Text>{business.contactPerson}</Text>
        <Text>{business.name}</Text>
        <Text>{business.address}</Text>

        {booking?.id && (
          <>
            <Text
              style={[
                {
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                  alignSelf: "flex-start",
                },
                booking?.bookingStatus == "Completed"
                  ? { color: "#008000" }
                  : booking?.bookingStatus == "Canceled"
                  ? { color: "#FF0000" }
                  : { color: Colors.primary },
              ]}
            >
              {booking.bookingStatus}
            </Text>
            <Text
              style={{ fontFamily: "outfit", color: "#EDEDED", fontSize: 16 }}
            >
              {booking.date} at {booking.time}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  container: {
    padding: 10,

    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 15,
  },
});
