import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

type Props = {
  title: string;
  description: string;
  badge?: string;
  onPress?: () => void;
  compact?: boolean;
};

export function InfoCard({ title, description, badge, onPress, compact }: Props) {
  const { palette } = useTheme();
  
  // Nilai scale (skala ukuran) untuk animasi mengecil saat ditekan
  const scale = useRef(new Animated.Value(1)).current;
  
  // Nilai glow (kilauan) untuk animasi perubahan warna border saat ditekan
  const glow = useRef(new Animated.Value(0)).current;

  // Fungsi yang dipanggil saat kartu mulai ditekan
  const handlePressIn = () => {
    Animated.parallel([
      // Skala mengecil secara halus dan elegan
      Animated.timing(scale, { toValue: 0.98, duration: 150, useNativeDriver: true }),
      // Mengubah nilai glow menjadi 1 dalam 150ms
      Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  // Fungsi yang dipanggil saat tekanan pada kartu dilepas
  const handlePressOut = () => {
    Animated.parallel([
      // Mengembalikan ukuran dengan transisi halus
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
      // Menghilangkan glow perlahan
      Animated.timing(glow, { toValue: 0, duration: 250, useNativeDriver: false }),
    ]).start();
  };

  // Menghubungkan nilai glow (0-1) dengan perubahan warna (dari abu-abu ke warna aksen emas)
  const borderColor = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [palette.border, palette.accent],
  });

  return (
    <Animated.View style={[{ transform: [{ scale }] }, compact ? styles.cardCompact : styles.cardRegular]}>
      <Animated.View style={{ borderRadius: 16, borderWidth: 1, borderColor, overflow: "hidden" }}>
        <LinearGradient
          colors={[palette.surfaceAlt, palette.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.card}
          >
            {/* Decorative corner accent */}
            <View style={[styles.cornerAccent, { backgroundColor: palette.accent }]} />

            {badge ? (
              <View style={[styles.badge, { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}>
                <View style={[styles.badgeDot, { backgroundColor: palette.accent }]} />
                <Text style={[styles.badgeText, { color: palette.accent }]}>{badge}</Text>
              </View>
            ) : null}

            <Text style={[styles.title, { color: palette.text }]}>{title}</Text>

            {description ? (
              <Text style={[styles.description, { color: palette.muted }]}>{description}</Text>
            ) : null}

            {onPress ? (
              <View style={[styles.chevron, { borderColor: palette.accent }]}>
                <Text style={[styles.chevronText, { color: palette.accent }]}>→</Text>
              </View>
            ) : null}
          </Pressable>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Gaya untuk kartu ukuran standar
  cardRegular: {
    flexGrow: 1,
    flexBasis: 300, // Lebar minimal kartu sebelum flex-wrap
    minHeight: 200,
  },
  // Gaya untuk kartu ukuran lebih kecil (compact)
  cardCompact: {
    width: 280, // Lebar tetap untuk kartu compact (biasanya dipakai di HorizontalRail)
    minHeight: 180,
  },
  // Efek gradasi background kartu
  gradient: {
    borderRadius: 16,
  },
  // Gaya layout isi konten di dalam kartu
  card: {
    padding: 24, // Jarak konten dari tepi kartu
    justifyContent: "center",
    gap: 12, // Jarak antar elemen vertikal (badge, title, description)
    // Efek bayangan (Shadow) untuk iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Efek bayangan (Elevation) untuk Android
    elevation: 3,
  },
  // Aksen garis berwarna di pojok kanan atas kartu
  cornerAccent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 48, // Lebar garis aksen
    height: 4, // Ketebalan garis aksen
    borderBottomLeftRadius: 4,
    opacity: 0.7,
  },
  // Gaya untuk kotak kecil berisi label/badge (misal: "Filosofi")
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // Jarak antara titik (dot) dan teks
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999, // Membuat bentuk pil (bulat di ujung)
    borderWidth: 1,
    marginBottom: 4,
  },
  // Titik kecil berwarna di sebelah teks badge
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    opacity: 0.8,
  },
  badgeText: {
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  // Gaya font untuk judul utama kartu
  title: {
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 24,
  },
  // Gaya font untuk teks penjelasan panjang
  description: {
    lineHeight: 21,
    fontSize: 13.5,
  },
  // Gaya untuk tombol bundar "→" yang muncul jika kartu bisa diklik
  chevron: {
    alignSelf: "flex-end", // Posisi di pojok kanan bawah
    marginTop: 6,
    width: 30, // Diameter tombol
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center", // Pusatkan ikon panah (horisontal)
    justifyContent: "center", // Pusatkan ikon panah (vertikal)
  },
  chevronText: {
    fontWeight: "900",
    fontSize: 14,
  },
});
