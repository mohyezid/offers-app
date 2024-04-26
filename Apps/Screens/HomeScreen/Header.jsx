import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
export default function Header() {
  const { user, isLoaded } = useUser();
  return (
    user && (
      <View style={styles.container}>
        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: Colors.white }}>Welcome,</Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                }}
              >
                {user?.fullName},
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={24} color="white" />
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput placeholder="search" style={styles.textInput} />
          <FontAwesome
            name="search"
            style={styles.searchBtn}
            size={24}
            color={Colors.primary}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    gap: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  profileContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 10,
  },
});
