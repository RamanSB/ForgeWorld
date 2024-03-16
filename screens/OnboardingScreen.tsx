import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/types";

export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  return <View style={styles.container}></View>;
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
