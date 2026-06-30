import { Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DetailItem } from "../types";
import { useTheme } from "../context/ThemeContext";
import { PrimaryButton } from "./PrimaryButton";

type Props = {
  visible: boolean;
  item?: DetailItem | null;
  onClose: () => void;
};

const platformIcons: Record<string, string> = {
  tokopedia: "🟢",
  shopee: "🟠",
  tiktok_shop: "🎵",
  tiktok: "🎵",
  instagram: "📷",
  facebook: "👍",
  youtube: "▶️",
  whatsapp: "💬",
  website: "🌐",
};

const platformColors: Record<string, string> = {
  tokopedia: "#00AA5B",
  shopee: "#EE4D2D",
  tiktok_shop: "#FF0050",
  tiktok: "#FF0050",
  instagram: "#E1306C",
  facebook: "#1877F2",
  youtube: "#FF0000",
  whatsapp: "#25D366",
  website: "#6C757D",
};

export function DetailModal({ visible, item, onClose }: Props) {
  const { palette } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View 
        style={[
          styles.overlay,
          { backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" } as any
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: palette.surface,
              borderColor: palette.border,
              shadowColor: palette.shadow,
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            {item ? (
              <>
                {/* Image with gradient overlay */}
                <View style={styles.imageWrap}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 0, y: 1 }}
                    pointerEvents="none"
                  />
                  {/* Close button on image */}
                  <Pressable
                    onPress={onClose}
                    style={[styles.closeBtn, { backgroundColor: palette.surface, borderColor: palette.border }]}
                  >
                    <Text style={[styles.closeBtnText, { color: palette.text }]}>✕</Text>
                  </Pressable>
                </View>

                {/* Content */}
                <View style={styles.contentPad}>
                  <Text style={[styles.title, { color: palette.text }]}>{item.title}</Text>
                  <Text style={[styles.description, { color: palette.muted }]}>
                    {item.description}
                  </Text>

                  {/* Meta chips */}
                  <View style={styles.metaWrap}>
                    {item.meta.slice(0, 2).map((value) => (
                      <View
                        key={value}
                        style={[
                          styles.metaChip,
                          { borderColor: palette.accent, backgroundColor: palette.accentSoft },
                        ]}
                      >
                        <Text style={[styles.metaText, { color: palette.accent }]}>{value}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Platform action buttons */}
                  {item.actions?.length ? (
                    <View style={styles.actions}>
                      <Text style={[styles.actionsLabel, { color: palette.muted }]}>
                        Beli / Kunjungi di:
                      </Text>
                      <View style={styles.actionsRow}>
                        {item.actions.map((action) => {
                          const key = action.label.toLowerCase().replace(/ /g, "_");
                          const icon = platformIcons[key] || "🔗";
                          const color = platformColors[key] || palette.accent;
                          return (
                            <Pressable
                              key={action.label}
                              onPress={() => Linking.openURL(action.url)}
                              style={({ pressed }) => [
                                styles.actionBtn,
                                { borderColor: color, backgroundColor: `${color}18` },
                                pressed && { opacity: 0.7 },
                              ]}
                            >
                              <Text style={styles.actionBtnIcon}>{icon}</Text>
                              <Text style={[styles.actionBtnLabel, { color }]}>
                                {action.label}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  ) : null}

                  <View style={{ marginTop: 16 }}>
                    <PrimaryButton label="Tutup" variant="outline" onPress={onClose} />
                  </View>
                </View>
              </>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)", // Reduced opacity since blur does the heavy lifting
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  sheet: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "88%",
    borderRadius: 28,
    borderWidth: 1,
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
    overflow: "hidden",
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    height: 230,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontWeight: "800",
    fontSize: 14,
  },
  contentPad: {
    padding: 18,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 28,
  },
  description: {
    lineHeight: 22,
    fontSize: 14,
  },
  metaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  metaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "700",
  },
  actions: {
    gap: 10,
    marginTop: 6,
  },
  actionsLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  actionBtnIcon: {
    fontSize: 16,
  },
  actionBtnLabel: {
    fontSize: 12,
    fontWeight: "800",
  },
});
