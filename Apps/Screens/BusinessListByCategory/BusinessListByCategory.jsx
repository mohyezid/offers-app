import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GlobalApis from "../utils/GlobalApis";
import BusinessListItem from "../HomeScreen/BusinessListItem";
import BusinessListItemSingle from "./BusinessListItemSingle";
import PageHeading from "../../Components/PageHeading";

export default function BusinessListByCategory() {
  const params = useRoute().params;
  const nav = useNavigation();
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    params && getBusinessByCategory();
  }, [params]);

  const getBusinessByCategory = () => {
    GlobalApis.getBusinessListByCategory(params.category).then((resp) => {
      setBusinessList(resp.businessLists);
    });
  };
  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHeading title={params.category} />
      <FlatList
        data={businessList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <BusinessListItemSingle business={item} />
        )}
      />
    </View>
  );
}
