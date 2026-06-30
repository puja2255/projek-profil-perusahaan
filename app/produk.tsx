import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PageShell } from "../src/components/PageShell";
import { SectionHeader } from "../src/components/SectionHeader";
import { ItemCard } from "../src/components/ItemCard";
import { DetailModal } from "../src/components/DetailModal";
import { useAppData } from "../src/context/AppDataContext";
import { DetailItem, Product } from "../src/types";

export default function ProdukPage() {
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const { products } = useAppData();
  const items = useMemo(() => products.map(mapProduct), [products]);

  return (
    <PageShell
      title="Produk"
      subtitle="Jelajahi koleksi produk premium kami dengan harga terbaik dan kualitas terjamin."
    >
      <SectionHeader title="Katalog Produk" subtitle="Pilih produk yang sesuai dengan kebutuhan bisnis Anda." />
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

function mapProduct(product: Product): DetailItem {
  return {
    id: product.id,
    title: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    meta: [`Rp${product.price.toLocaleString("id-ID")}`, "Produk"],
    actions: product.marketLinks.map((link) => ({
      label: linkLabel(link.platform),
      url: link.url
    }))
  };
}

function linkLabel(platform: string) {
  switch (platform) {
    case "tokopedia":
      return "Tokopedia";
    case "shopee":
      return "Shopee";
    case "tiktok_shop":
      return "TikTok Shop";
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
