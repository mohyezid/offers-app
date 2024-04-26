import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import BookingModel from "./BookingModel";
import Heading from "../../Components/Header";
export default function BusinessDetailScreen() {
  const params = useRoute().params;
  const nav = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [business, setBusiness] = useState(params?.business);
  useEffect(() => {}, [params]);
  return (
    <View>
      <ScrollView style={(height = "93%")}>
        <TouchableOpacity
          style={styles.backbtnContainer}
          onPress={() => nav.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color={Colors.white} />
        </TouchableOpacity>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: business?.images[0].url }}
        />
        <View style={styles.infoContainer}>
          <Text>{business?.name}</Text>
          <View style={styles.subcontainer}>
            <Text>{business?.contactPerson}</Text>
            <Text>{business?.category?.name}</Text>
          </View>
          <Text>{business?.address}</Text>
        </View>

        <View
          style={{ borderWidth: 0.4, borderColor: "#808080", marginTop: 20 }}
        ></View>

        <View>
          <Heading text={"About Me"} />
          <Text
            numberOfLines={5}
            style={{ lineHeight: 28, fontSize: 16, color: "#808080" }}
          >
            {business.about}
          </Text>
        </View>

        <View
          style={{ borderWidth: 0.4, borderColor: "#808080", marginTop: 20 }}
        ></View>
      </ScrollView>
      <View
        style={{ display: "flex", flexDirection: "row", gap: 8, margin: 8 }}
      >
        <TouchableOpacity style={styles.msgbtn}>
          <Text style={{ textAlign: "center" }}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookbtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={{ color: Colors.white, textAlign: "center" }}>
            Booking
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <BookingModel
          businessId={business?.id}
          hideModal={() => setShowModal(false)}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  msgbtn: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 99,
  },
  bookbtn: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 99,
  },
  backbtnContainer: {
    position: "absolute",
    zIndex: 100,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subcontainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
