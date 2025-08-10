import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import RootNav from "@navigation/index";
import { colors } from "@theme/theme";
import { AudioPlayer } from "@components/Player/AudioPlayer";
import { useAuthHydration } from "@hooks/useAuth";

export default function App() {
  useAuthHydration();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <RootNav />
      <AudioPlayer />
    </View>
  );
}