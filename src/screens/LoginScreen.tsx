import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors, spacing, radius } from "@theme/theme";
import { useAuth } from "@hooks/useAuth";

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    try {
      await login(username, password);
    } catch (e: any) {
      Alert.alert("Login fehlgeschlagen", e?.message ?? "Bitte prüfe deine Zugangsdaten.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swing Music</Text>
      <Text style={styles.subtitle}>Melde dich bei deinem Server an</Text>

      <TextInput
        placeholder="Benutzername"
        placeholderTextColor={colors.textDim}
        style={styles.input}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Passwort"
        placeholderTextColor={colors.textDim}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Anmelden..." : "Anmelden"}</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Server: {process.env.EXPO_PUBLIC_API_URL}</Text>
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
  buttonText: { color: "#000", fontWeight: "700" },
  hint: { color: colors.textDim, textAlign: "center", marginTop: spacing(2) }
});