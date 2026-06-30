import { StyleSheet, Text, View } from "react-native";
import { PageShell } from "../src/components/PageShell";
import { SurfaceCard } from "../src/components/SurfaceCard";
import { SectionBlock } from "../src/components/SectionBlock";
import { SectionHeader } from "../src/components/SectionHeader";
import { useAppData } from "../src/context/AppDataContext";
import { useTheme } from "../src/context/ThemeContext";

export default function TentangPage() {
  const { palette } = useTheme();
  const { companyProfile } = useAppData();

  return (
    <PageShell
      title="Tentang Kami"
      subtitle="Mengenal lebih jauh perjalanan dan visi kami."
    >
      <SectionBlock>
        <SurfaceCard>
          <View style={styles.content}>
            <Text style={[styles.title, { color: palette.text }]}>
              {companyProfile.name}
            </Text>
            <Text style={[styles.subtitle, { color: palette.accent }]}>
              {companyProfile.tagline}
            </Text>
            <Text style={[styles.description, { color: palette.muted }]}>
              {companyProfile.description}
            </Text>
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Misi Kami"
          subtitle="Komitmen kami terhadap keunggulan dan inovasi"
        />
        <SurfaceCard>
          <View style={styles.content}>
            <Text style={[styles.sectionText, { color: palette.muted }]}>
              Kami berkomitmen untuk memberikan solusi pemasaran terbaik yang menggabungkan kreativitas, inovasi, dan
              kepercayaan. Setiap produk dan layanan dirancang dengan cermat untuk memenuhi kebutuhan klien kami dan
              membantu bisnis mereka berkembang pesat di era digital.
            </Text>
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Nilai-Nilai Inti"
          subtitle="Prinsip yang memandu setiap keputusan kami"
        />
        <View style={styles.valuesGrid}>
          <ValueCard
            label="Integritas"
            description="Kejujuran dan transparansi dalam setiap interaksi bisnis."
            palette={palette}
          />
          <ValueCard
            label="Inovasi"
            description="Terus berkembang dengan teknologi dan strategi terkini."
            palette={palette}
          />
          <ValueCard
            label="Dedikasi"
            description="Komitmen penuh untuk kesuksesan klien dan mitra kami."
            palette={palette}
          />
          <ValueCard
            label="Kolaborasi"
            description="Bekerja sama untuk mencapai hasil yang luar biasa."
            palette={palette}
          />
        </View>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Perjalanan Kami"
          subtitle="Dari startup hingga mitra terpercaya"
        />
        <SurfaceCard>
          <View style={styles.timeline}>
            <TimelineItem
              year="2020"
              title="Dimulai"
              description="Perjalanan kami dimulai dengan visi sederhana untuk mengubah industri pemasaran."
              palette={palette}
            />
            <TimelineItem
              year="2021"
              title="Pertumbuhan"
              description="Kami berkembang pesat dengan tim yang berbakat dan berdedikasi."
              palette={palette}
            />
            <TimelineItem
              year="2022"
              title="Ekspansi"
              description="Membuka kantor baru dan memperluas jangkauan layanan kami."
              palette={palette}
            />
            <TimelineItem
              year="2024"
              title="Inovasi"
              description="Menghadirkan solusi digital terdepan untuk klien kami."
              palette={palette}
            />
          </View>
        </SurfaceCard>
      </SectionBlock>

      <SectionBlock>
        <SectionHeader
          title="Hubungi Kami"
          subtitle="Siap membantu mewujudkan visi bisnis Anda"
        />
        <SurfaceCard>
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text style={[styles.contactLabel, { color: palette.accent }]}>Lokasi</Text>
              <Text style={[styles.contactValue, { color: palette.text }]}>{companyProfile.address}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={[styles.contactLabel, { color: palette.accent }]}>Telepon</Text>
              <Text style={[styles.contactValue, { color: palette.text }]}>{companyProfile.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={[styles.contactLabel, { color: palette.accent }]}>Email</Text>
              <Text style={[styles.contactValue, { color: palette.text }]}>{companyProfile.email}</Text>
            </View>
          </View>
        </SurfaceCard>
      </SectionBlock>
    </PageShell>
  );
}

function ValueCard({
  label,
  description,
  palette
}: {
  label: string;
  description: string;
  palette: any;
}) {
  return (
    <View style={[styles.valueCard, { backgroundColor: palette.surfaceAlt, borderColor: palette.border, borderLeftColor: palette.accent }]}>
      <View style={[styles.valueIconWrap, { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}>
        <Text style={[styles.valueIcon, { color: palette.accent }]}>✦</Text>
      </View>
      <Text style={[styles.valueLabel, { color: palette.text }]}>{label}</Text>
      <Text style={[styles.valueDescription, { color: palette.muted }]}>{description}</Text>
    </View>
  );
}

function TimelineItem({
  year,
  title,
  description,
  palette
}: {
  year: string;
  title: string;
  description: string;
  palette: any;
}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <Text style={[styles.timelineYear, { color: palette.accent }]}>{year}</Text>
        <View style={[styles.timelineDot, { backgroundColor: palette.accent, borderColor: palette.accentSoft }]} />
      </View>
      <View style={[styles.timelineContent, { borderLeftColor: palette.border }]}>
        <Text style={[styles.timelineTitle, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.timelineDescription, { color: palette.muted }]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 26,
    gap: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 25,
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
  },
  valueCard: {
    flexGrow: 1,
    flexBasis: 260,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: 18,
    padding: 20,
    gap: 10,
    minHeight: 160,
    // Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  valueIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  valueIcon: {
    fontSize: 16,
    fontWeight: "900",
  },
  valueLabel: {
    fontSize: 18,
    fontWeight: "900",
  },
  valueDescription: {
    fontSize: 14,
    lineHeight: 21,
  },
  timeline: {
    padding: 24,
    gap: 0,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: "center",
    width: 56,
    gap: 6,
  },
  timelineYear: {
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    borderWidth: 3,
  },
  timelineContent: {
    flex: 1,
    gap: 6,
    paddingLeft: 14,
    borderLeftWidth: 1,
    paddingBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  timelineDescription: {
    fontSize: 14,
    lineHeight: 21,
  },
  contactGrid: {
    padding: 24,
    gap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  contactItem: {
    alignItems: "center",
    minWidth: 140,
    gap: 4,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
