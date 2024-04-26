import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Heading from "../../Components/Header";
import GlobalApis from "../utils/GlobalApis";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItemSingle from "../BusinessListByCategory/BusinessListItemSingle";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    user && getUserBooking();
  }, [user]);
  const getUserBooking = () => {
    GlobalApis.getUserBooking(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setBookingList(resp?.bookings);
        console.log(resp);
      }
    );
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 26 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          onRefresh={() => getUserBooking()}
          data={bookingList}
          renderItem={({ item, index }) => (
            <BusinessListItemSingle business={item.buisness} booking={item} />
          )}
        />
      </View>
    </View>
  );
}
