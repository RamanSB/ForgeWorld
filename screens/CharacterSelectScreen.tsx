import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameContext } from "../contexts/GameContext";
import { characters, worlds } from "../shared";
import { ICharacter, RootStackParamList } from "../types/types";

export type CharacterSelectScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "CharacterSelect">;
};

const attributes = {
  "Doge Da Dog": {
    strength: 12,
    intellect: 6,
    agility: 20,
    stamina: 10,
  },
  Bober: {
    strength: 20,
    intellect: 8,
    agility: 8,
    stamina: 12,
  },
  Pepe: { strength: 5, intellect: 20, agility: 12, stamina: 10 },
  PepePig: { strength: 17, intellect: 15, agility: 5, stamina: 10 },
  "Twinky Winky": { strength: 10, intellect: 15, agility: 10, stamina: 12 },
  "Crypo-Po": { strength: 5, intellect: 15, agility: 15, stamina: 12 },
};

export const CRYPPO_IMAGE_URL =
  "https://i.seadn.io/gae/N3XeQ7vV6dveAW4AGYY5jlVFiMCFdX_0Pny4rR9s0UJPOnCoN0rY5Gpu1L2gRcWcEMM78mEijTeP_gYRrvjtTt4MN9gcSFcCvYYj?auto=format&dpr=1&w=1000";

export const PEPE_PIG_IMAGE_URL =
  "https://i.seadn.io/gae/iXO3RI9Qxu90XGxRwWrFA09qROQRqR1eWQ44LvXZqiBiwVMq4a0rttNriv4vyOFAnyXJRt5coMAELgEUixFUSxkWSjZRsUliFHmOdQM?auto=format&dpr=1&w=1000";

export const PEPE_IMAGE_URL =
  "https://i.seadn.io/gae/xjiFDpUTAijt_wU2So-d11yuq8WKUe7Dr9jOq48wDgsJ8wWgBMqpOnJwo1R3RaZoPtaG4NkAXXI6TBWrf2DWvOSUHIvjyHAWEhjMOv4?auto=format&dpr=1&w=1000";

export const TWINKY_WINKY_IMAGE_URL =
  "https://i.seadn.io/s/raw/files/7f90b629334bcc87c6118650a180e1f5.png?auto=format&dpr=1&w=1000";

export const BO_BEAR_IMAGE_URL =
  "https://i.seadn.io/gae/MMb2rnXkS7m5McXvAB8QnRactpITRDKKayftVxhTyID8nYq_wee1REb_gbSRTl0r2kK3MSDjO2qsNc4U3CDd8GcazgfNkVSNgoxqapI?auto=format&dpr=1&w=1000";

export const DOGE_DOG_IMAGE_URL =
  "https://i.seadn.io/gae/AU-ip8HlUWOfUYwxbgnbJUcRtSauohPG6Wc7yB2HTXvW76CzclL03E52lOG4ehpPY7Skflhw5sfJecLsh4fInrkhe4MomoseJ2JUQg?auto=format&dpr=1&w=1000";

export const NOUNS_64_IMAGE_URL = ``;
export const NOUNS_69_IMAGE_URL = ``;
export const NOUNS_214_IMAGE_URL = ``;
export const NOUNS_233_IMAGE_URL = ``;
export const NOUNS_247_IMAGE_URL = `https://openseauserdata.com/files/236732aa6f86fde15afcd952af565f4d.svg`;

const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  navigation,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<
    ICharacter | undefined
  >(undefined);

  const [userName, setUserName] = useState("");
  const { player, setPlayer, setActiveWorld } = useContext(GameContext);

  const [fontsLoaded] = useFonts({
    ToysRUs: require("../assets/fonts/toys_r_us.ttf"),
  });

  /** Set the active world by default here for the user, can move this if necessary to a better location */
  useEffect(() => {
    setActiveWorld(worlds[0]);
    return () => {
      // Tear down logic ..
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleConfirmSelection = () => {
    if (userName.trim() && selectedCharacter) {
      console.log(
        "Character selected:",
        selectedCharacter?.name,
        "by",
        userName
      );

      setPlayer({
        username: userName,
        imgSrc: selectedCharacter.imgSrc,
        name: selectedCharacter.name,
        epochsAccrued: undefined,
        attributes: attributes[selectedCharacter.name],
        resources: undefined,
      });

      navigation.navigate("MainMenu");
    } else {
      alert("Please enter your name and select a character.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.charactersContainer}>
        <Text
          style={[
            { fontFamily: "ToysRUs", marginTop: 20 },
            styles.selectCharacterText,
          ]}
        >
          Enter Your Name
        </Text>
        <TextInput
          style={[styles.nameInput, { fontFamily: "ToysRUs" }]}
          placeholder="Enter your username"
          value={userName}
          onChangeText={setUserName}
        />
        <Text
          style={[
            styles.selectCharacterText,
            { fontFamily: "ToysRUs", marginTop: 10 },
          ]}
        >
          Select Character
        </Text>
        {characters.map((character: ICharacter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.characterRow,
              selectedCharacter?.name === character.name
                ? styles.selectedCharacter
                : {},
            ]}
            onPress={() => setSelectedCharacter(character)}
          >
            <Image
              source={{ uri: character.imgSrc }}
              style={styles.characterImage}
            />
            <Text style={[styles.characterName, { fontFamily: "ToysRUs" }]}>
              {character.name}
            </Text>
          </TouchableOpacity>
        ))}
        {selectedCharacter && userName.trim() && (
          <View style={styles.confirmButtonContainer}>
            <Button
              title="Confirm"
              onPress={handleConfirmSelection}
              type="clear"
              titleStyle={{
                fontFamily: "ToysRUs",
                fontSize: 20,
                color: "gold",
              }}
              buttonStyle={{ width: "100%" }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  confirmButtonContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 4,
    borderRadius: 5,
  },
  selectCharacterText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",

    marginBottom: 10,
  },
  charactersContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  characterRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "90%",
  },
  selectedCharacter: {
    borderColor: "#007bff",
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterName: {
    fontSize: 18,
  },
  nameInput: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default CharacterSelectScreen;
