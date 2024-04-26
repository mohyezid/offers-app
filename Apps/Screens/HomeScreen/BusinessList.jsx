import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Header";
import GlobalApis from "../utils/GlobalApis";
import BusinessListItem from "./BusinessListItem";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    getbusinessLists();
  }, []);

  const getbusinessLists = () => {
    GlobalApis.getBusinessList().then((resp) => {
      setBusinessList(resp?.businessLists);
      console.log("resp", resp);
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={"Latest Buisness"} isViewAll={true} />

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItem business={item} />
          </View>
        )}
      />
    </View>
  );
}
