import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApis from "../utils/GlobalApis";
import Heading from "../../Components/Header";
import { StackActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    getcategorys();
  }, []);

  const getcategorys = () => {
    GlobalApis.getCategory().then((resp) => {
      setCategory(resp?.categories);
      console.log("resp", resp);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={category}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.container}
              onPress={
                () =>
                  nav.navigate("Business-list", {
                    category: item?.name,
                  })

                // StackActions.push("Business-list", { category: item?.name })
              }
            >
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item?.icon?.url }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text style={{ fontFamily: "outfit-medium", marginTop: 5 }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#EDEDED",
    padding: 17,
    borderRadius: 99,
  },
});
