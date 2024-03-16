import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import World from "../components/World";
import { IGame, IWorld, RootStackParamList, Token } from "../types/types";
import { BottomSheet } from "@rneui/themed";
import { useFonts } from "expo-font";
import { GameContext } from "../contexts/GameContext";

type CharacterEntity = {
  position: {
    x: number;
    y: number;
  };
  target: {
    x: number;
    y: number;
  } | null;
};

type GameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Game">;
};

const window = Dimensions.get("window");

const PEPE_IMAGE: string =
  "https://www.freefavicon.com/freefavicons/objects/pepe-152-270481.png";

export const worlds: IWorld[] = [
  {
    terrain: "Volcano",
    title: "Mine Gems 💎",
    color: "red",
    metadata: { activePlayers: 3, token: Token.RUBY },
  },
  {
    terrain: "Forest",
    title: "Harvest Wood 🪵",
    color: "green",
    metadata: { activePlayers: 3, token: Token.LUMBER },
  },
  ,
  {
    terrain: "Ocean",
    title: "Fish for Pearls 🫧",
    color: "cornflowerblue",
    metadata: { activePlayers: 3, token: Token.PEARL },
  },
];

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const { activeWorld } = useContext(GameContext);

  console.log(`[GameScreen] - activeWorld: ${JSON.stringify(activeWorld)}`);

  const [fontsLoaded] = useFonts({
    ToysRUs: require("../assets/fonts/toys_r_us.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Main Menu",
      headerBackTitleStyle: {
        fontFamily: "ToysRUs",
      },
      headerTitle: "FoRgEwOrLd",

      headerTitleStyle: {
        fontFamily: "ToysRUs",
        color: "white",
      },
      headerStyle: { backgroundColor: "black" },
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <Game worlds={worlds} />
      <>{/* <WorldDetailBottomSheet /> */}</>
    </View>
  );
};

const Game = ({ worlds, character }: IGame) => {
  const insets = useSafeAreaInsets();
  const NOTCH_HEIGHT = insets.top; // Notch height (iPhone island) - perhaps other phones have this...
  console.log(`Notch Height: ${NOTCH_HEIGHT}`);

  const { activeWorld } = useContext(GameContext);

  const [worldLayouts, setWorldLayouts] = useState({});

  const handleWorldLayout = (idx, event) => {
    const { y, height } = event.nativeEvent.layout;
    const bottomY = y + height; // Calculate the bottom Y position

    console.log(`World (${idx}): ${bottomY}`);

    setWorldLayouts((prevLayouts) => ({
      ...prevLayouts,
      [idx]: {
        ...prevLayouts[idx],
        y: y, // Top-left Y
        bottomY: bottomY, // Bottom-left Y
      },
    }));
  };

  return (
    <View style={gameStyles.container}>
      {worlds.map((world: IWorld, idx: number) => (
        <View key={idx} style={{ flex: 1 }}>
          <World
            additionalStyle={idx === 0 ? { paddingTop: NOTCH_HEIGHT / 2 } : {}}
            terrain={world.terrain}
            title={world.title}
            color={world.color}
            metadata={world.metadata}
            key={idx}
            isActive={activeWorld.terrain === world.terrain}
            onLayout={(event) => handleWorldLayout(idx, event)}
          />
          <Divider />
        </View>
      ))}
      <>{/* <WorldDetailBottomSheet /> */}</>
    </View>
  );
};

const Divider = () => {
  return <View style={gameStyles.divider}></View>;
};

const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    width: "100%",
    height: 10,
    backgroundColor: "black",
  },
});

export default GameScreen;

const styles = StyleSheet.create({
  gameContainer: {
    zIndex: 2,
    flex: 1,
    position: "relative",
    backgroundColor: "#000",
  },
  character: {
    position: "absolute",
    width: 50,
    height: 50,
  },
});
