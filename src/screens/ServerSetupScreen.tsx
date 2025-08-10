import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors, spacing, radius } from "@theme/theme";
import { useServer } from "@hooks/useServer";

export default function ServerSetupScreen() {
  const { setBaseUrl, loading } = useServer();
  const [url, setUrl] = useState("");

  async function onSetServer() {
    try {
      const result = await setBaseUrl(url);
      if (!result.ok) {
        Alert.alert("Fehler", result.error);
      }
    } catch (e: any) {
      Alert.alert("Fehler", e?.message ?? "Server-URL konnte nicht gesetzt werden.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwingMusic</Text>
      <Text style={styles.subtitle}>Server-URL konfigurieren</Text>

      <TextInput
        placeholder="https://dein-server.tld/"
        placeholderTextColor={colors.textDim}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="url"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity 
        style={[styles.button, (!url.trim() || loading) && styles.buttonDisabled]} 
        onPress={onSetServer} 
        disabled={!url.trim() || loading}
      >
        <Text style={styles.buttonText}>{loading ? "Verbinden..." : "Server festlegen"}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Gib die URL deines SwingMusic-Servers ein. Diese wird auf dem Gerät gespeichert.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing(3), justifyContent: "center" },
  title: { color: colors.text, fontSize: 32, fontWeight: "700", textAlign: "center" },
  subtitle: { color: colors.textDim, textAlign: "center", marginTop: spacing(1), marginBottom: spacing(4) },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.md,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.5),
    marginBottom: spacing(2),
    borderWidth: 1,
    borderColor: colors.border
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing(1.75),
    alignItems: "center",
    marginTop: spacing(1)
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#000", fontWeight: "700" },
  hint: { color: colors.textDim, textAlign: "center", marginTop: spacing(2), fontSize: 14 }
});