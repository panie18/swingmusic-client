import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing } from "@theme/theme";
import { usePlayer } from "@store/playerStore";
import { Ionicons } from "@expo/vector-icons";

export function NowPlayingBar({ onPress }: { onPress?: () => void }) {
  const { current, isPlaying, setPlaying } = usePlayer();

  if (!current) return null;

  const cover = current.image;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      {cover ? <Image source={{ uri: cover }} style={styles.cover} /> : <View style={[styles.cover, styles.placeholder]} />}
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{current.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{current.trackArtists.map(a => a.name).join(", ")}</Text>
      </View>
      <TouchableOpacity onPress={() => setPlaying(!isPlaying)} hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color={colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.25),
    flexDirection: "row",
    alignItems: "center",
    gap: spacing(2)
  },
  cover: { width: 40, height: 40, borderRadius: 4, backgroundColor: colors.surfaceAlt },
  placeholder: { backgroundColor: colors.surfaceAlt },
  meta: { flex: 1 },
  title: { color: colors.text, fontWeight: "600" },
  subtitle: { color: colors.textDim, marginTop: 2 }
});