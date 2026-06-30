import { useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  footer?: string;
  onPress?: () => void;
  compact?: boolean;
};

export function ItemCard({ title, subtitle, imageUrl, footer, onPress, compact }: Props) {
  const { palette } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, { toValue: 0.98, duration: 150, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardWrap,
        { transform: [{ scale }] },
        compact && styles.compact,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          shadowColor: palette.shadow,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        {/* Image with gradient overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={[styles.image, compact && styles.imageCompact]}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.55)"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.4 }}
            end={{ x: 0, y: 1 }}
            pointerEvents="none"
          />
          {subtitle ? (
            <View style={[styles.subtitleChip, { backgroundColor: palette.accent }]}>
              <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
          ) : null}
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={[styles.title, { color: palette.text }]} numberOfLines={2}>
            {title}
          </Text>
          {footer ? (
            <View style={styles.footerRow}>
              <View style={[styles.footerDot, { backgroundColor: palette.accent }]} />
              <Text style={[styles.footer, { color: palette.muted }]}>{footer}</Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    width: "100%",
    borderRadius: 16, // Professional smaller radius
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 }, // Subtle shadow
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  compact: {
    width: 280,
  },
  pressable: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 185,
  },
  imageCompact: {
    height: 165,
  },
  subtitleChip: {
    position: "absolute",
    bottom: 10,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  subtitleText: {
    color: "#1f2329",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 0.4,
  },
  body: {
    padding: 14,
    gap: 6,
  },
  title: {
    fontWeight: "800",
    fontSize: 14.5,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  footerDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    opacity: 0.8,
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
  },
});
