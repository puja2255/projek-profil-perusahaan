import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export function SurfaceCard({ children }: PropsWithChildren) {
  const { palette } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          shadowColor: palette.shadow,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16, // Professional smaller radius
    borderWidth: 1,
    overflow: "hidden",
    // iOS shadow (subtle and sleek)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Android
    elevation: 3,
  },
});
