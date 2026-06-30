import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function SectionHeader({ title, subtitle, actionLabel, onPressAction }: Props) {
  const { palette } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.leftBlock}>
        {/* Accent bar */}
        <View style={[styles.accentBar, { backgroundColor: palette.accent }]} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: palette.muted }]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      {actionLabel && onPressAction ? (
        <Pressable
          onPress={onPressAction}
          style={({ pressed }) => [
            styles.action,
            { borderColor: palette.accent, backgroundColor: palette.accentSoft },
            pressed && { opacity: 0.75 },
          ]}
        >
          <Text style={[styles.actionText, { color: palette.accent }]}>{actionLabel}</Text>
          <Text style={[styles.actionArrow, { color: palette.accent }]}>→</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 12,
    flexWrap: "wrap",
  },
  leftBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  accentBar: {
    width: 4,
    borderRadius: 999,
    minHeight: 40,
    marginTop: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.1,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 13.5,
    lineHeight: 20,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  actionText: {
    fontWeight: "700",
    fontSize: 12,
  },
  actionArrow: {
    fontWeight: "900",
    fontSize: 13,
  },
});
