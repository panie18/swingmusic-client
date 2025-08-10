import { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Lyrics } from "@api/types";
import { activeLyricIndex } from "@utils/lrc";
import { colors, spacing } from "@theme/theme";

export function LyricsView({ lyrics, positionMs }: { lyrics: Lyrics | null; positionMs: number }) {
  const idx = useMemo(() => (lyrics?.synced ? activeLyricIndex(lyrics.lines, positionMs) : -1), [lyrics, positionMs]);

  if (!lyrics) {
    return (
      <View style={styles.container}>
        <Text style={styles.dim}>Keine Lyrics verfügbar</Text>
      </View>
    );
  }

  if (!lyrics.synced) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{lyrics.raw ?? "Keine Lyrics verfügbar"}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={lyrics.lines}
      keyExtractor={(item, i) => `${item.timeMs}-${i}`}
      initialScrollIndex={Math.max(idx - 3, 0)}
      getItemLayout={(_, index) => ({ length: 36, offset: 36 * index, index })}
      renderItem={({ item, index }) => {
        const active = index === idx;
        return (
          <View style={styles.line}>
            <Text style={[styles.text, active && styles.active]}>{item.text || " "}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing(2), alignItems: "center" },
  list: { paddingHorizontal: spacing(2) },
  line: { height: 36, justifyContent: "center" },
  text: { color: colors.textDim, textAlign: "center", fontSize: 16 },
  active: { color: colors.text, fontWeight: "600" },
  dim: { color: colors.textDim }
});