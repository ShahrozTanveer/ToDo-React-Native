import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
interface MainProps {}
const { width, height } = Dimensions.get("window");
export const Main: React.FC<MainProps> = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
      }}
    >
      <View style={styles.full}>
        <Image source={require("../assets/main.jpg")} style={styles.imgStyle} />
      </View>
      <View style={styles.btnView}>
        <View style={styles.button}>
          <Text style={styles.text}>Get Started</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  text: { fontSize: 20, fontWeight: "bold" },
  full: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    flex: 1,
    height: height,
    width: width,
  },
  btnView: { height: height / 3, justifyContent: "center" },
});
