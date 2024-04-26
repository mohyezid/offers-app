import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Apps/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigations from "./Apps/Navigations/TabNavigations";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "outfit-medium": require("./assets/Fonts/Outfit-Medium.ttf"),
    outfit: require("./assets/Fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/Fonts/Outfit-Bold.ttf"),
  });
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_bW9yYWwtYnVsbGRvZy0zOS5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigations />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    flex: 1,
  },
});
