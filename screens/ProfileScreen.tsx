import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { GameContext } from "../contexts/GameContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Token } from "../types/types";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Button, LinearProgress } from "@rneui/themed";
import { CheckBox, Dialog, Divider } from "@rneui/base";

export type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { player } = useContext(GameContext); // Assuming your context provides the player object with a level and username
  console.log(`[ProfileScreen]: ${JSON.stringify(player)}`);
  const [isClaimableDialogVisible, setIsClaimableDialogVisible] =
    useState(false);
  const [isLevelUpDialogVisible, setIsLevelUpDialogVisible]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [requestingTransaction, setRequestTransaction]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  // checkedAttribuet
  const [checkedAttribute, setCheckedAttribute] = useState(1);
  const ATTRIBUTES_LIST: string[] = [
    "Strength",
    "Intellect",
    "Agility",
    "Stamina",
  ];

  const [fontsLoaded] = useFonts({
    ToysRUs: require("../assets/fonts/toys_r_us.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;
    const fetchResources = async () => {
      // Make fetch  call to blockchain [existing player resources] (if data is not undefined and isMounted) - setResources.
      if (isMounted) {
      }
    };

    const fetchClaimableResources = async () => {
      // Make fetch call to blockchain [claimable Resources](if data is not undefined and isMounted) - setClaimableResources.
      if (isMounted) {
      }
    };
    // await fetchResources();
    return () => {
      isMounted = false;
    };
  }, []);

  // NOTE: PRI use setResources to update the resources when you make your call to the BlOCKACHAIN
  const [resources, setResources] = useState({
    rubies: 100,
    lumber: 100,
    pearls: 100,
  });

  const [claimableResources, setClaimableResources] = useState({
    rubies: 12,
    lumber: 3,
    pearls: 8,
  });

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

  const ActionButtons = ({
    setIsClaimableDialogVisible,
    setIsLevelUpDialogVisible,
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={() => setIsClaimableDialogVisible(true)}
            title="Claim"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={() => setIsLevelUpDialogVisible(true)}
            title="Level Up"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer} onLayout={onLayoutRootView}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { fontFamily: "ToysRUs" }]}>
          {player.username}
        </Text>
        <Text style={[styles.cardTitle, { fontFamily: "ToysRUs" }]}>
          {player.name}
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cardImage}
            source={{ uri: player.imgSrc }} // The player's image URL goes here
          />
        </View>
        <LevelSection currentLevel={currentLevel} />
      </View>

      <AttributeSection
        agility={attributes.agility}
        intellect={attributes.intellect}
        strength={attributes.strength}
        stamina={attributes.stamina}
      />
      <Divider
        style={{ height: 4, borderWidth: 4, marginVertical: 16 }}
        orientation="vertical"
      />
      <ResourceSection
        lumber={resources.lumber}
        pearls={resources.pearls}
        ruby={resources.rubies}
      />
      <ActionButtons
        setIsClaimableDialogVisible={setIsClaimableDialogVisible}
        setIsLevelUpDialogVisible={setIsLevelUpDialogVisible}
      />
      {isClaimableDialogVisible && (
        <Dialog
          isVisible={isClaimableDialogVisible}
          overlayStyle={{ backgroundColor: "white" }}
          onBackdropPress={() => {
            setIsClaimableDialogVisible(false);
          }}
        >
          <Dialog.Title
            title={`Claim Tokens`}
            titleStyle={{ fontFamily: "ToysRUs" }}
          />

          <Text>
            {Object.entries(claimableResources).map(([key, value], idx) => {
              console.log(key);
              console.log(value);

              return (
                <Text key={key} style={{ fontFamily: "ToysRUs", fontSize: 18 }}>
                  {"\n"}
                  {key}: {value}
                </Text>
              );
            })}
          </Text>

          <Dialog.Actions>
            <Dialog.Button
              title="Confirm"
              onPress={() => {
                // TODO: Api Call use loading states.
                setRequestTransaction(true);
              }}
            />
            <Dialog.Button
              title="Cancel"
              onPress={() => setIsClaimableDialogVisible(false)}
            />
          </Dialog.Actions>
        </Dialog>
      )}
      {isLevelUpDialogVisible && (
        <Dialog
          isVisible={isLevelUpDialogVisible}
          overlayStyle={{ backgroundColor: "white" }}
          onBackdropPress={() => {
            setIsLevelUpDialogVisible(false);
          }}
        >
          {!requestingTransaction ? (
            <>
              <Text style={{ fontFamily: "ToysRUs", fontSize: 18 }}>
                Level Up Your Skill
              </Text>
              {/* Should be using enums but its a hackathon so fuck it*/}
              {ATTRIBUTES_LIST.map((l, i) => (
                <CheckBox
                  key={i}
                  title={l}
                  containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={checkedAttribute === i}
                  onPress={() => setCheckedAttribute(i)}
                />
              ))}

              <Text style={{ fontFamily: "ToysRUs" }}>
                {_determineSkillPaymentAmount(
                  ATTRIBUTES_LIST[checkedAttribute] as
                    | "Agility"
                    | "Stamina"
                    | "Strength"
                    | "Intellect"
                )}
              </Text>

              <Dialog.Actions>
                <Dialog.Button
                  title="Confirm"
                  onPress={() => {
                    // TODO: Api Call use loading states.
                    setRequestTransaction(true);
                  }}
                />
                <Dialog.Button
                  title="Cancel"
                  onPress={() => setIsLevelUpDialogVisible(false)}
                />
              </Dialog.Actions>
            </>
          ) : (
            <Dialog.Loading />
          )}
        </Dialog>
      )}
    </View>
  );
};

// some bullshit helper functino to calculate fake values
const _determineSkillPaymentAmount = (
  skill: "Agility" | "Stamina" | "Strength" | "Intellect"
) => {
  let requiredAmount = "Required Amount: \n";
  switch (skill) {
    case "Agility":
      requiredAmount += "5 Rubies\n10 Lumber\n8 Pearlss";
      return requiredAmount;
    case "Stamina":
      requiredAmount += "5 Rubies\n19 Lumber\n8 Pearlss";
      return requiredAmount;
    case "Strength":
      requiredAmount += "2 Rubies\n1 Lumber\n8 Pearlss";
      return requiredAmount;
    case "Intellect":
      requiredAmount += "56 Rubies\n10 Lumber\n8 Pearlss";
      return requiredAmount;
    default:
      console.error(`unknwon skill bruh wtf... ${skill}`);
  }
};

const LevelSection = ({ currentLevel }: { currentLevel: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        width: "100%",
      }}
    >
      <Text style={[styles.cardLevel, { fontFamily: "ToysRUs" }]}>
        Level {currentLevel}
      </Text>
      <LinearProgress
        style={{
          flex: 1,
          marginVertical: 10,
          width: 70,
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
  );
};

const AttributeSection = ({
  strength,
  intellect,
  agility,
  stamina,
}: {
  strength: number;
  intellect: number;
  agility: number;
  stamina: number;
}) => {
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "ToysRUs" }}>
          💪 Strength: {strength}
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "ToysRUs" }}>
          🏃‍♂️ Stamina: {stamina}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "ToysRUs" }}>
          🤸‍♂️ Agility: {agility}
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "ToysRUs" }}>
          🧠 Intellect: {intellect}
        </Text>
      </View>
    </View>
  );
};

const ResourceSection = ({ ruby, pearls, lumber }) => {
  const ResourceItem = ({
    token,
    amount,
  }: {
    token: Token;
    amount: number;
  }) => {
    const iconMap = new Map([
      [Token.RUBY, "💎"],
      [Token.LUMBER, "🪵"],
      [Token.PEARL, "🫧"],
    ]);

    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: "ToysRUs", fontSize: 20 }}>{token}</Text>
        <Text style={{ fontFamily: "ToysRUs", fontSize: 20, marginTop: 16 }}>
          {iconMap.get(token)} {amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          padding: 16,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ResourceItem token={Token.RUBY} amount={ruby} />
        <ResourceItem token={Token.LUMBER} amount={lumber} />
        <ResourceItem token={Token.PEARL} amount={pearls} />
      </View>
    </View>
  );
};

// NOTE FOR PRI: When you click these buttons (define a state above in the ProfileScreen and pass it as a prop to the ResourceSection component to update the displayed )

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

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1, // This ensures that the button's container takes up equal space
    paddingHorizontal: 5, // Optional: Adds some spacing between the buttons
  },
  buttonStyle: {
    backgroundColor: "black",
    borderRadius: 4,
  },
  titleStyle: {
    fontFamily: "ToysRUs",
    color: "gold",
  },
});
