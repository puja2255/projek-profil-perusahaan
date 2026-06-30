import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PageShell } from "../src/components/PageShell";
import { SectionHeader } from "../src/components/SectionHeader";
import { ItemCard } from "../src/components/ItemCard";
import { DetailModal } from "../src/components/DetailModal";
import { useAppData } from "../src/context/AppDataContext";
import { Activity, DetailItem } from "../src/types";

export default function KegiatanPage() {
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const { activities } = useAppData();
  const items = useMemo(() => activities.map(mapActivity), [activities]);

  return (
    <PageShell
      title="Kegiatan"
      subtitle="Ikuti perkembangan terkini melalui event dan aktivitas perusahaan kami."
    >
      <SectionHeader title="Agenda Kegiatan" subtitle="Dokumentasi lengkap dari setiap momen penting perusahaan." />
      <View style={styles.grid}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            compact
            imageUrl={item.imageUrl}
            title={item.title}
            subtitle={item.subtitle}
            footer={item.meta[0]}
            onPress={() => setDetail(item)}
          />
        ))}
      </View>
      <DetailModal visible={!!detail} item={detail} onClose={() => setDetail(null)} />
    </PageShell>
  );
}

function mapActivity(activity: Activity): DetailItem {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    imageUrl: activity.imageUrl,
    meta: [activity.date, activity.location || "Lokasi menyusul"]
  };
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center"
  }
});
