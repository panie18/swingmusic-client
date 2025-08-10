import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, spacing, radius } from "@theme/theme";
import { usePlayer } from "@store/playerStore";
import { getLyrics } from "@api/endpoints";
import { Lyrics } from "@api/types";
import { LyricsView } from "@components/Lyrics/LyricsView";
import { Slider } from "expo-slider";
import { Ionicons } from "@expo/vector-icons";

export default function NowPlayingScreen() {
  const { current, isPlaying, setPlaying, positionMs, durationMs } = usePlayer();
  const [lyrics, setLyrics] = useState<Lyrics | null>(null);

  useEffect(() => {
    (async () => {
      if (!current) return;
      const l = await getLyrics({
        trackHash: current.trackHash,
        filepath: current.filepath
      });
      setLyrics(l);
    })();
  }, [current?.trackHash, current?.filepath]);

  if (!current) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.dim}>Nichts wird abgespielt</Text>
      </View>
    );
  }

  const cover = current.image;

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {cover ? <Image source={{ uri: cover }} style={styles.cover} /> : <View style={[styles.cover, styles.coverPlaceholder]} />}

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{current.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{current.trackArtists.map(a => a.name).join(", ")}</Text>
      </View>

      <View style={styles.controls}>
        <Slider
          value={durationMs ? positionMs / durationMs : 0}
          onValueChange={() => {}}
          minimumTrackTintColor={colors.accent}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.accent}
        />
        <View style={styles.row}>
          <TouchableOpacity><Ionicons name="play-skip-back" size={28} color={colors.text} /></TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={() => setPlaying(!isPlaying)}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity><Ionicons name="play-skip-forward" size={28} color={colors.text} /></TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, marginTop: spacing(2) }}>
        <LyricsView lyrics={lyrics} positionMs={positionMs} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(2), paddingTop: spacing(6) },
  center: { alignItems: "center", justifyContent: "center" },
  header: { height: spacing(2) },
  cover: { width: "100%", aspectRatio: 1, borderRadius: radius.lg, backgroundColor: colors.surface },
  coverPlaceholder: { backgroundColor: colors.surface },
  meta: { marginTop: spacing(2) },
  title: { color: colors.text, fontSize: 22, fontWeight: "700" },
  subtitle: { color: colors.textDim, marginTop: 4 },
  controls: { marginTop: spacing(2) },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: spacing(1) },
  playButton: { backgroundColor: colors.accent, width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  dim: { color: colors.textDim }
});