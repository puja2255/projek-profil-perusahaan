import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PageShell } from "../src/components/PageShell";
import { SectionHeader } from "../src/components/SectionHeader";
import { InfoCard } from "../src/components/InfoCard";
import { DetailModal } from "../src/components/DetailModal";
import { useAppData } from "../src/context/AppDataContext";
import { DetailItem, Partner } from "../src/types";

export default function MitraPage() {
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const { partners } = useAppData();
  const items = useMemo(() => partners.map(mapPartner), [partners]);

  return (
    <PageShell
      title="Mitra"
      subtitle="Bergabunglah dengan jaringan mitra terpercaya kami yang terus berkembang."
    >
      <SectionHeader title="Daftar Mitra" subtitle="Kemitraan yang saling menguntungkan untuk pertumbuhan bersama." />
      <View style={styles.grid}>
        {items.map((item) => (
          <InfoCard
            key={item.id}
            badge={item.subtitle}
            title={item.title}
            description={item.description}
            compact
            onPress={() => setDetail(item)}
          />
        ))}
      </View>
      <DetailModal visible={!!detail} item={detail} onClose={() => setDetail(null)} />
    </PageShell>
  );
}

function mapPartner(partner: Partner): DetailItem {
  return {
    id: partner.id,
    title: partner.name,
    description: partner.description,
    imageUrl: partner.logoUrl,
    meta: ["Mitra resmi", "Profil lengkap"],
    actions: partner.socialLinks.map((link) => ({
      label: linkLabel(link.platform),
      url: link.url
    }))
  };
}

function linkLabel(platform: string) {
  switch (platform) {
    case "instagram":
      return "Instagram";
    case "tiktok":
      return "TikTok";
    case "facebook":
      return "Facebook";
    case "youtube":
      return "YouTube";
    case "whatsapp":
      return "WhatsApp";
    default:
      return "Website";
  }
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center"
  }
});
