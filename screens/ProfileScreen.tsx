import React, { useCallback, useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Button, LinearProgress } from "@rneui/themed";

export type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { player } = useContext(GameContext); // Assuming your context provides the player object with a level and username
  console.log(`[ProfileScreen]: ${JSON.stringify(player)}`);
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
      headerTitle: "Guild",
      headerTitleStyle: {
        fontFamily: "ToysRUs",
      },
      headerStyle: { backgroundColor: "transparent" },
    });
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { attributes } = player;
  const currentLevel = Object.values(attributes).reduce((a, b) => a + b);
  return (
    <View style={styles.cardContainer} onLayout={onLayoutRootView}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { fontFamily: "ToysRUs" }]}>
          {player.username}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.cardLevel, { fontFamily: "ToysRUs" }]}>
            Level {currentLevel}
          </Text>
          <LinearProgress
            style={{
              marginVertical: 10,
              width: 75,
              height: 8,
              borderRadius: 8,
              marginHorizontal: 4,
            }}
            value={Math.random()}
            variant="determinate"
            trackColor="red"
            color="green"
          />
          <Text style={[styles.cardLevel, { fontFamily: "ToysRUs" }]}>
            {" "}
            {currentLevel + 1}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          source={{ uri: player.imgSrc }} // The player's image URL goes here
        />
      </View>
      <View style={styles.attributesContainer}>
        <View style={[styles.column1]}>
          <Text style={[styles.resourcesHeader, { fontFamily: "ToysRUs" }]}>
            Attributes
          </Text>
          <Text style={[styles.attributeName, { fontFamily: "ToysRUs" }]}>
            Strength
          </Text>
          <Text style={[styles.attributeValue, { fontFamily: "ToysRUs" }]}>
            {attributes.strength}
          </Text>
          <Text style={[styles.attributeName, { fontFamily: "ToysRUs" }]}>
            Intellect
          </Text>
          <Text style={[styles.attributeValue, { fontFamily: "ToysRUs" }]}>
            {attributes.intellect}
          </Text>
          <Text style={[styles.attributeName, { fontFamily: "ToysRUs" }]}>
            Agility
          </Text>
          <Text style={[styles.attributeValue, { fontFamily: "ToysRUs" }]}>
            {attributes.agility}
          </Text>
          <Text style={[styles.attributeName, { fontFamily: "ToysRUs" }]}>
            Stamina
          </Text>
          <Text style={[styles.attributeValue, { fontFamily: "ToysRUs" }]}>
            {attributes.stamina}
          </Text>
        </View>

        <View style={styles.resourcesContainer}>
          <Text style={[styles.resourcesHeader, { fontFamily: "ToysRUs" }]}>
            Resources
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.column2}>
              <Text style={[styles.subHeader, { fontFamily: "ToysRUs" }]}>
                Earned
              </Text>

              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                💎 Rubies
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.rubies */}135
              </Text>

              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                🫧 Pearls
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.pearls */}51
              </Text>
              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                🪵 Lumber
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.lumber */}12
              </Text>
            </View>

            <View style={styles.column3}>
              <Text style={[styles.subHeader, { fontFamily: "ToysRUs" }]}>
                Claimable
              </Text>
              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                💎 Rubies
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.claimableRubies */}12
              </Text>
              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                🫧 Pearls
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.claimablePearls */}53
              </Text>
              <Text style={[styles.resourceName, { fontFamily: "ToysRUs" }]}>
                🪵 Lumber
              </Text>
              <Text style={[styles.resourceValue, { fontFamily: "ToysRUs" }]}>
                {/* player.claimableLumber */}125
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: "5%", marginTop: 6 }}>
            <Button
              title="Claim"
              type="outline"
              titleStyle={{ fontFamily: "ToysRUs", color: "gold" }}
              buttonStyle={{
                width: "100%",
                backgroundColor: "black",
                borderRadius: 4,
              }}
              onPress={() => {
                /* TODO: Api Call to claim resources. */
              }}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 10,

    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: 'ToysRUs', // Uncomment and set to your custom font if you have it loaded
  },
  cardLevel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderWidth: 2,
    width: "100%",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 48,
  },
  cardImage: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 50, // Make it round
    borderWidth: 2,
  },

  attributesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 12,
  },
  column1: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  attributeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  attributeValue: {
    fontSize: 14,
    borderWidth: 2,
    width: "100%",
    textAlign: "center",
  },
  resourcesContainer: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  resourcesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    width: "100%",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 16,
  },
  resourceValue: {
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    borderWidth: 2,
  },
  column2: {
    alignItems: "flex-start",
    marginTop: 4,
  },
  column3: {
    alignItems: "flex-start",
    marginTop: 4,
  },
});
