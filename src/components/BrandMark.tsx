import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
  compact?: boolean; // Jika true, jarak antar elemen lebih rapat
};

export function BrandMark({ compact }: Props) {
  const { palette } = useTheme(); // Mengambil warna dari tema yang aktif (light/dark)

  return (
    // Container utama untuk logo dan teks
    <View style={[styles.wrap, compact && styles.compact]}>
      
      {/* Simbol Berlian. */}
      <View style={[styles.symbol, { borderColor: palette.accent }]}>
        
        {/* Lingkaran cincin dalam (potongan garis lengkung di dalam) */}
        <View style={[styles.innerArc, { borderColor: palette.accent }]} />
        
        {/* Potongan (Cut) yang menimpa border luar untuk membuat efek putus */}
        <View style={[styles.cut, { backgroundColor: palette.bg }]} />
      </View>

      {/* Teks nama perusahaan */}
      <Text style={[styles.text, { color: palette.accent }]}>PT GOLDEN IB</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Gaya untuk container utama (logo + teks)
  wrap: {
    flexDirection: "row", // Menyusun logo dan teks ke samping
    alignItems: "center", // Memastikan tinggi sejajar di tengah
    gap: 12 // Jarak antara simbol logo dan teks nama perusahaan
  },
  compact: {
    gap: 8 // Jarak lebih rapat jika properti compact aktif
  },
  
  // Gaya untuk lingkaran luar logo
  symbol: {
    width: 40, // Lebar keseluruhan logo
    height: 40, // Tinggi keseluruhan logo
    borderWidth: 5, // Ketebalan cincin luar
    borderRadius: 999, // Membuat bentuk lingkaran sempurna
    borderTopColor: "transparent", // Menghilangkan sisi atas (efek cincin terputus)
    borderLeftColor: "transparent", // Menghilangkan sisi kiri
    // transform rotasi ini akan ditimpa oleh animasi di atas, namun bisa berguna sebagai fallback
    transform: [{ rotate: "-18deg" }] 
  },
  
  // Gaya untuk cincin kecil di bagian dalam
  innerArc: {
    position: "absolute",
    width: 22, // Ukuran cincin dalam, harus lebih kecil dari cincin luar
    height: 22,
    borderWidth: 5, // Ketebalan cincin dalam
    borderRadius: 999,
    borderBottomColor: "transparent", // Membuat efek setengah lingkaran
    borderRightColor: "transparent",
    top: 8, // Posisi Y di dalam cincin besar
    left: 5, // Posisi X di dalam cincin besar
    transform: [{ rotate: "18deg" }] // Memutar cincin dalam
  },
  
  // Potongan untuk menutupi sebagian cincin dan memberikan efek terpotong
  cut: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    bottom: -1, // Menempatkan potongan di bagian bawah kanan
    right: -1
  },
  
  // Gaya font untuk teks nama perusahaan
  text: {
    fontSize: 15, // Ukuran teks perusahaan
    fontWeight: "900", // Ketebalan font (bold/black)
    letterSpacing: 1.1 // Jarak antar huruf agar terlihat premium
  }
});
