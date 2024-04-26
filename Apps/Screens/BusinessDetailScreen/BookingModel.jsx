import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../utils/Colors";
import Heading from "../../Components/Header";
import GlobalApis from "../utils/GlobalApis";
import { useUser } from "@clerk/clerk-expo";
import moment from "moment/moment";
export default function BookingModel({ businessId, hideModal }) {
  const [timelist, setTimeList] = useState();
  const [note, setNote] = useState("");
  const [selecttime, setSelectedTime] = useState();
  const [selectdate, setSelectedDAte] = useState();
  const { user } = useUser();
  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    let timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }

    setTimeList(timeList);
    console.log(timelist);
  };
  const createNewBooking = () => {
    if (!selecttime || !selectdate) {
      ToastAndroid.show("Please Enter Time and date!", ToastAndroid.LONG);
    }
    const data = {
      name: user?.username,
      email: user?.primaryEmailAddress.emailAddress,
      time: selecttime,
      date: moment(selectdate).format("DD-MMM-yyyy"),

      businessid: businessId,
    };
    GlobalApis.createBooking(data).then((resp) => {
      console.log(resp);
      ToastAndroid.show("Booking created successfully");
      hideModal();
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() => hideModal()}
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
          <Text>Booking</Text>
        </TouchableOpacity>
        <Heading text={"select Date"} />
        <View style={style.calendarContainetr}>
          <CalendarPicker
            minDate={Date.now()}
            todayBackgroundColor={Colors.primary}
            onDateChange={setSelectedDAte}
            width={340}
            todayTextStyle={{ color: Colors.white }}
            selectedDayColor={Colors.primary}
            selectedDayTextColor={Colors.white}
          />
        </View>
        <View>
          <Heading text={"select Time"} />
          <FlatList
            data={timelist}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={
                    selecttime == item.time
                      ? style.selectedTime
                      : style.unselectedTime
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any suggestion Note"} />
          <TextInput
            onChange={(text) => setNote(text)}
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={style.noteTextArea}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking}
        >
          <Text style={style.confirmbtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  calendarContainetr: {
    backgroundColor: "#EDEDED",
    padding: 20,
    borderRadius: 15,
  },

  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.primary,
  },
  confirmbtn: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
