import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "solid" | "outline";
  compact?: boolean;
};

export function PrimaryButton({ label, onPress, variant = "solid", compact }: Props) {
  const { palette } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const outline = variant === "outline";

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 24,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.base,
          {
            backgroundColor: outline ? "transparent" : palette.accent,
            borderColor: palette.accent,
            shadowColor: outline ? "transparent" : palette.accent,
          },
          compact && styles.compact,
        ]}
      >
        <Text style={[styles.label, { color: outline ? palette.accent : "#1f2329" }]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    borderRadius: 999,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    // Glow / shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  compact: {
    minHeight: 36,
    paddingHorizontal: 14,
  },
  label: {
    fontWeight: "800",
    fontSize: 13.5,
    letterSpacing: 0.2,
  },
});
