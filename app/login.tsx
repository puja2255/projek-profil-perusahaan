import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BrandMark } from "../src/components/BrandMark";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { SurfaceCard } from "../src/components/SurfaceCard";
import { useAuth } from "../src/context/AuthContext";
import { useTheme } from "../src/context/ThemeContext";

export default function LoginPage() {
  const { palette } = useTheme();
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await login(username, password);
      router.replace("/admin");
    } catch {
      Alert.alert("Login gagal", "Username atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.page, { backgroundColor: palette.bg }]}>
      <SurfaceCard>
        <View style={styles.card}>
          <BrandMark />
          <Text style={[styles.title, { color: palette.text }]}>Login Admin</Text>
          <Text style={[styles.subtitle, { color: palette.muted }]}>
            Masuk untuk membuka halaman pengelolaan data.
          </Text>
          <Input label="Username" value={username} onChangeText={setUsername} />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <PrimaryButton label={loading ? "Memproses..." : "Masuk"} onPress={submit} />
          <Pressable onPress={() => router.replace("/")} style={styles.backBtn}>
            <Text style={[styles.backText, { color: palette.accent }]}>Kembali ke beranda</Text>
          </Pressable>
        </View>
      </SurfaceCard>
    </View>
  );
}

function Input({
  label,
  value,
  onChangeText,
  secureTextEntry
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
}) {
  const { palette } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={palette.muted}
        style={[styles.input, { borderColor: palette.border, backgroundColor: palette.surfaceAlt, color: palette.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18
  },
  card: {
    padding: 22,
    gap: 14,
    minWidth: 320,
    maxWidth: 440
  },
  title: {
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    lineHeight: 20
  },
  field: {
    gap: 6
  },
  label: {
    fontSize: 12,
    fontWeight: "800"
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  backBtn: {
    alignSelf: "center",
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  backText: {
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5
  }
});
