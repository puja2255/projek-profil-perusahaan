import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  helper?: string;
  maxSizeMb?: number;
};

export function ImageFileInput({ value, onChange, label = "Upload Gambar", helper = "Ukuran maksimal 2MB", maxSizeMb = 2 }: Props) {
  const { palette } = useTheme();
  const WebInput = "input" as any;

  const handleWebChange = async (event: any) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMb * 1024 * 1024) {
      Alert.alert("Ukuran file terlalu besar", `Ukuran file maksimal ${maxSizeMb}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
      {Platform.OS === "web" ? (
        <WebInput
          type="file"
          accept="image/*"
          onChange={handleWebChange}
          style={{
            color: palette.text,
            background: palette.surfaceAlt,
            border: `1px solid ${palette.border}`,
            borderRadius: 14,
            padding: 12
          }}
        />
      ) : (
        <Text style={[styles.helper, { color: palette.muted }]}>
          Upload file image di web tersedia. Untuk mobile, kamu bisa lanjut pakai URL sementara.
        </Text>
      )}
      <Text style={[styles.helper, { color: palette.muted }]}>{helper}</Text>
      {value ? <Text style={[styles.preview, { color: palette.accent }]}>Gambar sudah dipilih</Text> : null}
      {value ? <Image source={{ uri: value }} style={[styles.imagePreview, { borderColor: palette.border }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8
  },
  label: {
    fontWeight: "700",
    fontSize: 12
  },
  helper: {
    fontSize: 12,
    lineHeight: 18
  },
  preview: {
    fontSize: 12,
    fontWeight: "700"
  },
  imagePreview: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 4
  }
});
