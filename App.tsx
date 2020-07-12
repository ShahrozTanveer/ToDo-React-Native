import { StatusBar } from "expo-status-bar";
import React from "react";
import { Main } from "./Components/Main";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { useState } from "react";

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default function App() {
  const [ready, setReady] = useState(false);
  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require("./assets/main.jpg")]);
    await Promise.all([...imageAssets]);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Main />
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   {/* <StatusBar style="auto" /> */}
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
