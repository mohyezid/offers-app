import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    console.log("first");
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/Images/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{ fontSize: 27, color: Colors.white, textAlign: "center" }}
        >
          Let's Find
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            Professional cleaning and repair{" "}
          </Text>
          Service
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: Colors.white,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {" "}
          Best App to find service near you which delever shdvsh sb
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Colors.primary }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    borderWidth: 4,
    marginTop: 70,
    borderRadius: 15,
    borderColor: Colors.BLACK,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.primary,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 99,
    marginTop: 40,
  },
});
