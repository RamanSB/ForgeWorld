import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import GameScreen from "./screens/GameScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import SplashScreen from "./screens/SplashScreen";
import { RootStackParamList } from "./types/types";
import { GameContextProvider } from "./contexts/GameContext";
import MainMenuScreen from "./screens/MainMenuScreen";
import CharacterSelectScreen from "./screens/CharacterSelectScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GameContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CharacterSelect">
          <Stack.Screen name={"Splash"} component={SplashScreen} />
          <Stack.Screen name={"Onboarding"} component={OnboardingScreen} />
          <Stack.Screen name={"MainMenu"} component={MainMenuScreen} />
          <Stack.Screen name={"Profile"} component={ProfileScreen} />
          <Stack.Screen
            name={"CharacterSelect"}
            component={CharacterSelectScreen}
          />
          <Stack.Screen name={"Game"} component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
