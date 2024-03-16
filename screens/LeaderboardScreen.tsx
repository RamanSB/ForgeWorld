import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

export type LeaderboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Leaderboard">;
};

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Main Menu",
      headerBackTitleStyle: {
        fontFamily: "ToysRUs",
      },
      headerTitle: "Leaderboard",
      headerTitleStyle: {
        fontFamily: "ToysRUs",
      },
      headerStyle: { backgroundColor: "transparent" },
    });
  });

  return (
    <ImageBackground
      source={require("../assets/leaderboard-bg.png")}
      style={{ flex: 1, justifyContent: "center", padding: 0, margin: 0 }}
    >
      <Text>LeaderboardScreen</Text>
    </ImageBackground>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
