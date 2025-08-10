import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "@theme/theme";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deine Playlists (Platzhalter)</Text>
      <Text style={styles.subtitle}>Implementiere hier Endpunkte wie /me/playlists etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: spacing(2), paddingHorizontal: spacing(2) },
  header: { color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: spacing(2) },
  subtitle: { color: colors.textDim }
});