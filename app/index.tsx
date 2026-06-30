import { useMemo, useState, useEffect, useRef } from "react";
import { Linking, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { DetailModal } from "../src/components/DetailModal";
import { HorizontalRail } from "../src/components/HorizontalRail";
import { InfoCard } from "../src/components/InfoCard";
import { ItemCard } from "../src/components/ItemCard";
import { PageShell } from "../src/components/PageShell";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { SectionBlock } from "../src/components/SectionBlock";
import { SectionHeader } from "../src/components/SectionHeader";
import { SurfaceCard } from "../src/components/SurfaceCard";
import { BrandMark } from "../src/components/BrandMark";
import { OrgTree } from "../src/components/OrgTree";
import { useAppData } from "../src/context/AppDataContext";
import { useTheme } from "../src/context/ThemeContext";
import { Activity, DetailItem, Partner, Product } from "../src/types";
import { theme } from "../src/theme";
import { philosophy, services, mission, vision } from "../src/mockData";
import { Link } from "expo-router";

export default function HomePage() {
  const [detail, setDetail] = useState<DetailItem | null>(null);
  const { palette } = useTheme();
  const { companyProfile, orgMembers, products, partners, activities } = useAppData();
  const { width } = useWindowDimensions();
  const isCompact = width < 860;
  const isMobile = width < 600;

  const productPreview = useMemo(() => products.map(mapProduct), [products]);
  const partnerPreview = useMemo(() => partners.map(mapPartner), [partners]);
  const activityPreview = useMemo(() => activities.map(mapActivity), [activities]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <PageShell title="" subtitle="">
      <SectionBlock>
        <SurfaceCard>
          <View style={[styles.hero, isCompact && styles.heroCompact]}>
            <Animated.View style={[styles.heroCopy, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <BrandMark />
              <View style={styles.heroKickerWrap}>
                <View style={[styles.heroKickerDot, { backgroundColor: palette.accent }]} />
                <Text style={[styles.heroKicker, { color: palette.accent }]}>DIGITAL MARKETING & BRANDING</Text>
              </View>
              <Text style={[styles.heroTitle, { color: palette.text }]}>Transformasi Bisnis Menjadi{"\n"}Berlian yang Bersinar</Text>
              <Text style={[styles.heroText, { color: palette.muted }]}>
                {companyProfile.description}
              </Text>
              <View style={styles.heroActions}>
                <Link href="/produk" style={[styles.heroCta, { backgroundColor: palette.accent, color: "#1f2329" }]}>
                  Eksplorasi Produk
                </Link>
                <Link
                  href="/mitra"
                  style={[
                    styles.heroCta,
                    styles.heroCtaOutline,
                    { backgroundColor: "transparent", color: palette.accent, borderColor: palette.accent }
                  ]}
                >
                  Lihat Mitra →
                </Link>
              </View>
            </Animated.View>
            <Animated.View style={[styles.heroVisualWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Image source={{ uri: companyProfile.heroImageUrl }} style={styles.heroVisual} />
              <View 
                style={[
                  styles.heroBadge, 
                  { borderColor: palette.border },
                  { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } as any
                ]}
              >
                <LinearGradient
                  colors={[palette.surfaceAlt + '60', palette.bgSoft + '80']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.heroBadgeRow}>
                  <View style={[styles.heroBadgeIcon, { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}>
                    <Text style={{ fontSize: 14 }}>💎</Text>
                  </View>
                  <View>
                    <Text style={[styles.heroBadgeTitle, { color: palette.accent }]}>PT GOLDEN IB</Text>
                    <Text style={[styles.heroBadgeText, { color: palette.muted }]}>{companyProfile.address}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Filosofi Golden Intan Berlian"
          subtitle="Nilai yang membentuk gaya kerja, arah visual, dan standar layanan perusahaan."
        />
        <View style={styles.philosophyGrid}>
          {philosophy.map((item) => (
            <InfoCard key={item.title} badge="Filosofi" title={item.title} description="" />
          ))}
        </View>
      </SectionBlock>

      <SectionBlock>
        <SurfaceCard>
          <View style={styles.visionWrap}>
            <View style={styles.visionLabelRow}>
              <View style={[styles.visionLabelPill, { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}>
                <Text style={[styles.sectionLabel, { color: palette.accent }]}>✦ VISI KAMI</Text>
              </View>
            </View>
            <Text style={[styles.visionTitle, { color: palette.text }]}>{vision.title}</Text>
            <Text style={[styles.visionText, { color: palette.muted }]}>{vision.description}</Text>
            <View style={[styles.visionDivider, { backgroundColor: palette.border }]} />
            <Text style={[styles.missionSectionLabel, { color: palette.accent }]}>MISI KAMI</Text>
            <View style={styles.missionWrap}>
              {mission.map((point, index) => (
                <View
                  key={point}
                  style={[styles.missionCard, { backgroundColor: palette.surfaceAlt, borderColor: palette.border, borderLeftColor: palette.accent }]}
                >
                  <Text style={[styles.missionIndex, { color: palette.accent }]}>{String(index + 1).padStart(2, "0")}</Text>
                  <Text style={[styles.missionText, { color: palette.text }]}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Layanan Unggulan Kami"
          subtitle="Solusi pemasaran yang dirancang simpel, elegan, dan efektif."
        />
        <View style={styles.serviceGrid}>
          {services.map((service) => (
            <InfoCard key={service.id} badge={service.icon} title={service.title} description={service.description} />
          ))}
        </View>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Struktur Organisasi"
          subtitle="Hierarki perusahaan tampil dengan atasan dan bawahan yang jelas."
        />
        <SurfaceCard>
          <View style={styles.treePanel}>
            <OrgTree members={orgMembers} />
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Produk Unggulan"
          subtitle="Koleksi produk premium yang dirancang dengan sempurna untuk kebutuhan Anda."
        />
        <HorizontalRail cardWidth={280} autoScrollMs={3000}>
          {productPreview.map((item) => (
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
        </HorizontalRail>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Kepercayaan Mitra"
          subtitle="Bergabung dengan mitra-mitra terpercaya yang mendukung visi kami."
        />
        <HorizontalRail cardWidth={280} autoScrollMs={3000}>
          {partnerPreview.map((item) => (
            <InfoCard
              key={item.id}
              badge={item.subtitle}
              title={item.title}
              description={item.description}
              onPress={() => setDetail(item)}
            />
          ))}
        </HorizontalRail>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Kegiatan Perusahaan"
          subtitle="Dokumentasi event dan aktivitas yang mencerminkan budaya perusahaan kami."
        />
        <HorizontalRail cardWidth={280} autoScrollMs={3000}>
          {activityPreview.map((item) => (
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
        </HorizontalRail>
      </SectionBlock>

      <SectionBlock>
        <View style={[styles.footerPanel, isMobile && styles.footerPanelMobile]}>
          <Text style={[styles.footerTitle, { color: palette.accent }]}>{companyProfile.name}</Text>
          <Text style={[styles.footerLead, { color: palette.text }]}>{companyProfile.tagline}</Text>
          <View style={[styles.footerInfoGrid, isMobile && styles.footerInfoGridMobile]}>
            <View style={[styles.footerInfoItem, isMobile && styles.footerInfoItemMobile]}>
              <Text style={[styles.footerInfoLabel, { color: palette.accent }]}>Lokasi</Text>
              <Text style={[styles.footerInfoText, { color: palette.muted }]}>{companyProfile.address}</Text>
            </View>
            {!isMobile && (
              <>
                <View style={styles.footerInfoItem}>
                  <Text style={[styles.footerInfoLabel, { color: palette.accent }]}>WhatsApp</Text>
                  <Text
                    style={[styles.footerInfoText, { color: palette.muted, textDecorationLine: "underline" }]}
                    onPress={() => Linking.openURL(companyProfile.whatsappUrl)}
                  >
                    {companyProfile.phone}
                  </Text>
                </View>
                <View style={styles.footerInfoItem}>
                  <Text style={[styles.footerInfoLabel, { color: palette.accent }]}>Email</Text>
                  <Text
                    style={[styles.footerInfoText, { color: palette.muted, textDecorationLine: "underline" }]}
                    onPress={() => Linking.openURL(`mailto:${companyProfile.email}`)}
                  >
                    {companyProfile.email}
                  </Text>
                </View>
              </>
            )}
          </View>
          {isMobile && (
            <View style={styles.footerInfoGridMobileBottom}>
              <View style={styles.footerInfoItem}>
                <Text style={[styles.footerInfoLabel, { color: palette.accent }]}>WhatsApp</Text>
                <Text
                  style={[styles.footerInfoText, { color: palette.muted, textDecorationLine: "underline" }]}
                  onPress={() => Linking.openURL(companyProfile.whatsappUrl)}
                >
                  {companyProfile.phone}
                </Text>
              </View>
              <View style={styles.footerInfoItem}>
                <Text style={[styles.footerInfoLabel, { color: palette.accent }]}>Email</Text>
                <Text
                  style={[styles.footerInfoText, { color: palette.muted, textDecorationLine: "underline" }]}
                  onPress={() => Linking.openURL(`mailto:${companyProfile.email}`)}
                >
                  {companyProfile.email}
                </Text>
              </View>
            </View>
          )}
        </View>
      </SectionBlock>

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
      label: platformLabel(link.platform),
      url: link.url
    }))
  };
}

function mapPartner(partner: Partner): DetailItem {
  return {
    id: partner.id,
    title: partner.name,
    description: partner.description,
    imageUrl: partner.logoUrl,
    meta: ["Mitra resmi", "Klik untuk detail lengkap"],
    actions: partner.socialLinks.map((link) => ({
      label: platformLabel(link.platform),
      url: link.url
    }))
  };
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

function platformLabel(platform: string) {
  switch (platform) {
    case "tokopedia":
      return "Tokopedia";
    case "shopee":
      return "Shopee";
    case "tiktok_shop":
      return "TikTok Shop";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    case "youtube":
      return "YouTube";
    case "tiktok":
      return "TikTok";
    case "whatsapp":
      return "WhatsApp";
    default:
      return "Website";
  }
}

const styles = StyleSheet.create({
  hero: {
    padding: 22,
    flexDirection: "row",
    gap: 18,
    alignItems: "stretch"
  },
  heroCompact: {
    flexDirection: "column"
  },
  heroCopy: {
    flex: 1,
    gap: 14,
    justifyContent: "center"
  },
  heroKicker: {
    color: theme.darkPalette.accent,
    fontWeight: "800",
    letterSpacing: 1.2,
    fontSize: 11
  },
  heroTitle: {
    color: theme.darkPalette.text,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "900",
    maxWidth: 720
  },
  heroText: {
    color: theme.darkPalette.muted,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 760
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  heroCta: {
    minHeight: 42,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: theme.darkPalette.accent,
    color: "#1f2329",
    fontWeight: "800",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 42
  },
  heroCtaOutline: {
    backgroundColor: "transparent",
    color: theme.darkPalette.accent,
    borderWidth: 1,
    borderColor: theme.darkPalette.accent
  },
  heroVisualWrap: {
    width: "42%",
    minWidth: 260,
    gap: 12
  },
  heroVisual: {
    width: "100%",
    minHeight: 260,
    borderRadius: 22,
    backgroundColor: theme.darkPalette.bgSoft
  },
  heroBadge: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    overflow: "hidden", // Important for LinearGradient inside
    backgroundColor: "transparent",
  },
  heroBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  heroBadgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBadgeTitle: {
    color: theme.darkPalette.accent,
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 2,
  },
  heroBadgeText: {
    color: theme.darkPalette.muted,
    fontSize: 12,
  },
  heroKickerWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroKickerDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },
  sectionLabel: {
    color: theme.darkPalette.accent,
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  philosophyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
    alignItems: "stretch",
  },
  visionWrap: {
    padding: 26,
    gap: 14,
  },
  visionLabelRow: {
    flexDirection: "row",
  },
  visionLabelPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  visionTitle: {
    color: theme.darkPalette.text,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    maxWidth: 620,
  },
  visionText: {
    color: theme.darkPalette.muted,
    lineHeight: 22,
    maxWidth: 720,
    fontSize: 14.5,
  },
  visionDivider: {
    height: 1,
    opacity: 0.6,
    marginVertical: 4,
  },
  missionSectionLabel: {
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  missionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  missionCard: {
    flexGrow: 1,
    flexBasis: 240,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  missionIndex: {
    color: theme.darkPalette.accent,
    fontWeight: "900",
    fontSize: 20,
    lineHeight: 24,
  },
  missionText: {
    color: theme.darkPalette.text,
    lineHeight: 20,
    fontWeight: "600",
    fontSize: 13.5,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
    alignItems: "stretch",
  },
  treePanel: {
    padding: 22,
  },
  footerPanel: {
    padding: 28,
    gap: 14,
    alignItems: "center",
  },
  footerPanelMobile: {
    padding: 18,
    gap: 12,
  },
  footerTitle: {
    color: theme.darkPalette.accent,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  footerText: {
    color: theme.darkPalette.muted
  },
  footerLead: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center"
  },
  footerInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 12,
    justifyContent: "center",
    width: "100%"
  },
  footerInfoGridMobile: {
    gap: 0,
    marginTop: 12,
    justifyContent: "center"
  },
  footerInfoGridMobileBottom: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: 12
  },
  footerInfoItem: {
    alignItems: "center",
    minWidth: 140
  },
  footerInfoItemMobile: {
    minWidth: "100%"
  },
  footerInfoLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6
  },
  footerInfoText: {
    lineHeight: 20,
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center"
  },
  footerActionRow: {
    display: "none"
  }
});
