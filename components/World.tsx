import { AntDesign } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import React, { useCallback, useContext } from "react";
import {
  ImageBackground,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IWorld } from "../types/types";
import { GameContext } from "../contexts/GameContext";
import Avatar from "./Avatar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const images = {
  Volcano: require("../assets/volcanic-terrain.png"),
  Forest: require("../assets/forest-terrain.png"),
  Ocean: require("../assets/ocean-terrain.png"),
};

const World = ({
  title,
  metadata,
  color,
  terrain,
  additionalStyle,
  isActive,
  onLayout,
}: IWorld) => {
  const { setSelectedWorld, setIsBottomSheetVisible } = useContext(GameContext);
  const img = images[terrain];

  console.log(`World: ${title} ${isActive} ${terrain}`);
  const [fontsLoaded] = useFonts({
    ToysRUs: require("../assets/fonts/toys_r_us.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      style={[worldStyles.bg, additionalStyle]}
      source={img}
      onLayout={onLayout}
    >
      <View style={worldStyles.topRow}>
        <View style={worldStyles.activePlayersBg}>
          <Text
            style={{
              color: "white",
              textTransform: "uppercase",
              fontFamily: "ToysRUs",
            }}
          >
            #Active Forges: {metadata.activePlayers}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(`Pressing info on ${terrain}`);
            setSelectedWorld({
              color,
              metadata,
              terrain,
              additionalStyle,
              title,
            });
            setIsBottomSheetVisible(true);
          }}
        >
          <AntDesign name="infocirlceo" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          worldStyles.bottomRow,
          { flexDirection: isActive ? "row" : "row-reverse" },
        ]}
      >
        {isActive && <Avatar />}
        <Button
          title={title}
          onPress={() => {
            console.log(`Pressed: ${title}`);
          }}
          buttonStyle={[worldStyles.button, { backgroundColor: color }]}
          titleStyle={[worldStyles.buttonTitle, { fontFamily: "ToysRUs" }]}
        />
      </View>
    </ImageBackground>
  );
};
export default World;

const worldStyles = StyleSheet.create({
  bg: {
    flex: 1,
    padding: 16,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activePlayersBg: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 4,
    padding: 8,
  },
  bottomRow: {
    justifyContent: "space-between",
  },
  button: {
    minWidth: 100,
    minHeight: 50,
    borderRadius: 50,
    elevation: 4,
    borderColor: "white",
    borderWidth: 0.5,
  },
  buttonTitle: {
    textTransform: "uppercase",
    padding: 4,
    fontWeight: "bold",
  },
});
