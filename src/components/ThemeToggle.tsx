import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { mode, palette, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: palette.border,
          backgroundColor: palette.surfaceAlt,
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={styles.icon}>{mode === "dark" ? "☀️" : "🌙"}</Text>
      <Text style={{ color: palette.text, fontWeight: "700", fontSize: 12 }}>
        {mode === "dark" ? "Terang" : "Gelap"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  icon: {
    fontSize: 14,
  },
});
