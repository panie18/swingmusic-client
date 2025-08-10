import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { colors, spacing } from "@theme/theme";
import { getFavoritesSummary } from "@api/endpoints";
import { Track } from "@api/types";
import { usePlayer } from "@store/playerStore";
import { useNavigation } from "@react-navigation/native";
import { NowPlayingBar } from "@components/Player/NowPlayingBar";

export default function HomeScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const setQueue = usePlayer((s) => s.setQueue);
  const nav = useNavigation<any>();

  useEffect(() => {
    (async () => {
      try {
        const favs = await getFavoritesSummary({ track_limit: 20, album_limit: 10, artist_limit: 10 });
        setTracks(favs.tracks || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Favoriten – Titel</Text>
      <FlatList
        data={tracks}
        keyExtractor={(t) => t.trackHash}
        contentContainerStyle={{ paddingHorizontal: spacing(2), paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: spacing(1.25) }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => { setQueue([item], 0); nav.navigate("NowPlaying"); }}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.cover} /> : <View style={[styles.cover, styles.placeholder]} />}
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{item.trackArtists?.map(a => a.name).join(", ")}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <NowPlayingBar onPress={() => nav.navigate("NowPlaying")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  section: { color: colors.text, fontSize: 20, fontWeight: "700", paddingHorizontal: spacing(2), marginTop: spacing(3), marginBottom: spacing(1.5) },
  row: { flexDirection: "row", alignItems: "center", gap: spacing(2), paddingVertical: spacing(1.25) },
  cover: { width: 48, height: 48, borderRadius: 6, backgroundColor: colors.surface },
  placeholder: { backgroundColor: colors.surface },
  title: { color: colors.text, fontWeight: "600" },
  subtitle: { color: colors.textDim, marginTop: 2 }
});