import { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, radius } from "@theme/theme";
// Platzhalter – an echten Search-Endpunkt anpassen:
import { Track } from "@api/types";
import { usePlayer } from "@store/playerStore";
import { useNavigation } from "@react-navigation/native";
import { NowPlayingBar } from "@components/Player/NowPlayingBar";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const setQueue = usePlayer((s) => s.setQueue);
  const nav = useNavigation<any>();

  async function onSubmit() {
    if (!query.trim()) return;
    // TODO: implementiere echten /search Call und setTracks
    setTracks([]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Suche nach Songs, Alben, Artists…"
        placeholderTextColor={colors.textDim}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <FlatList
        data={tracks}
        keyExtractor={(t) => t.trackHash}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => { setQueue([item], 0); nav.navigate("NowPlaying"); }}>
            <View style={styles.cover} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{item.trackArtists.map(a => a.name).join(", ")}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <NowPlayingBar onPress={() => nav.navigate("NowPlaying")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(2) },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.pill,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.25),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing(2)
  },
  row: { flexDirection: "row", alignItems: "center", gap: spacing(2), paddingVertical: spacing(1.25) },
  cover: { width: 48, height: 48, borderRadius: 6, backgroundColor: colors.surfaceAlt },
  title: { color: colors.text, fontWeight: "600" },
  subtitle: { color: colors.textDim, marginTop: 2 }
});