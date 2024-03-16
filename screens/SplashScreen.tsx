import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";
import { RootStackParamList } from "../types/types";
import { useFocusEffect } from "@react-navigation/native";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
};

const SPLASH_SCREEN_DURATION = 3000; // 3000ms
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const timeoutRef: MutableRefObject<NodeJS.Timeout> = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  useFocusEffect(
    useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        navigation.navigate("Onboarding");
      }, SPLASH_SCREEN_DURATION);
      return () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {/* TODO: Add Base Logo and Meme Wars */}
        <Text>MemeWars</Text>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({ container: { flex: 1 } });
