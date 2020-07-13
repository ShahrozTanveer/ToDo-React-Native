import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Todos } from "./Todos";
interface MainProps {}
const { width, height } = Dimensions.get("window");
export const Main: React.FC<MainProps> = ({}) => {
  const [isPressed, setIsPressed] = useState<Boolean>(false);
  if (isPressed) {
    return <Todos />;
  }
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsPressed(true);
          }}
        >
          <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
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
