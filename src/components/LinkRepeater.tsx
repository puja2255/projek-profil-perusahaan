import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { MarketplacePlatform, MarketplaceLink, SocialLink, SocialPlatform } from "../types";

type Option = { label: string; value: MarketplacePlatform | SocialPlatform; icon: string };

type Props = {
  title: string;
  items: Array<MarketplaceLink | SocialLink>;
  onChange: (items: Array<MarketplaceLink | SocialLink>) => void;
  options: Option[];
};

export function LinkRepeater({ title, items, onChange, options }: Props) {
  const { palette } = useTheme();

  const addRow = () => {
    onChange([...items, { platform: options[0].value, url: "" } as MarketplaceLink]);
  };

  const updateRow = (index: number, next: Partial<MarketplaceLink | SocialLink>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...next } : item)));
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={[styles.row, { backgroundColor: palette.surfaceAlt, borderColor: palette.border }]}>
          <View style={styles.rowTop}>
            <View style={[styles.select, { borderColor: palette.border }]}>
              <Text style={[styles.selectText, { color: palette.text }]}>
                {options.find((option) => option.value === item.platform)?.icon || "↗"}{" "}
                {options.find((option) => option.value === item.platform)?.label || item.platform}
              </Text>
            </View>
            <Pressable onPress={() => removeRow(index)}>
              <Text style={[styles.remove, { color: palette.danger }]}>Hapus</Text>
            </Pressable>
          </View>
          <TextInput
            value={item.url}
            onChangeText={(value) => updateRow(index, { url: value })}
            placeholder="https://..."
            placeholderTextColor={palette.muted}
            style={[styles.input, { color: palette.text, borderColor: palette.border, backgroundColor: palette.bgSoft }]}
          />
          <View style={styles.optionRow}>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => updateRow(index, { platform: option.value })}
                style={[
                  styles.option,
                  { borderColor: palette.border },
                  item.platform === option.value && { backgroundColor: palette.accentSoft, borderColor: palette.accent }
                ]}
                >
                <Text style={{ color: item.platform === option.value ? palette.accent : palette.muted, fontSize: 11, fontWeight: "800" }}>
                    {option.icon} {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
        </View>
      ))}
      <Pressable onPress={addRow} style={[styles.addBtn, { borderColor: palette.accent, backgroundColor: palette.accentSoft }]}>
        <Text style={[styles.addText, { color: palette.accent }]}>Tambah Link</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10
  },
  title: {
    fontWeight: "800",
    fontSize: 12
  },
  row: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 10
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  select: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1
  },
  selectText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "capitalize"
  },
  remove: {
    fontSize: 12,
    fontWeight: "800"
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 999
  },
  addBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 999
  },
  addText: {
    fontSize: 12,
    fontWeight: "800"
  }
});
