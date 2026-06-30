import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function PageShell({ title, subtitle, children }: Props) {
  const { palette } = useTheme();
  const { width } = useWindowDimensions();
  const isCompact = width < 860;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: palette.bg }]}>
      {/* Top navigation bar */}
      <View
        style={[
          styles.topbar,
          {
            borderBottomColor: palette.border,
            backgroundColor: palette.bgSoft + "D0", // Add transparency for blur
            shadowColor: palette.shadow,
            // Web-only style for true glassmorphism
            ...({ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" } as any)
          },
        ]}
      >
        <BrandMark compact={isCompact} />
        <View style={[styles.menu, isCompact && styles.menuCompact]}>
          <NavLink href="/" label="Beranda" palette={palette} />
          <NavLink href="/produk" label="Produk" palette={palette} />
          <NavLink href="/kegiatan" label="Kegiatan" palette={palette} />
          <NavLink href="/mitra" label="Mitra" palette={palette} />
          <NavLink href="/tentang" label="Tentang" palette={palette} />
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isCompact && styles.contentCompact]}
        showsVerticalScrollIndicator={false}
      >
        {title || subtitle ? (
          <View style={[styles.pageHeader, { borderColor: palette.border }]}>
            <LinearGradient
              colors={[palette.surfaceAlt, palette.bgSoft]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={[styles.headerAccent, { backgroundColor: palette.accent }]} />
            {title ? <Text style={[styles.title, { color: palette.text }]}>{title}</Text> : null}
            {subtitle ? <Text style={[styles.subtitle, { color: palette.muted }]}>{subtitle}</Text> : null}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

function NavLink({ href, label, palette }: { href: string; label: string; palette: any }) {
  return (
    <Link href={href} style={[styles.menuLink, { color: palette.text }]}>
      {label}
    </Link>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  topbar: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
    // iOS shadow for glass-like depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  menu: {
    flexDirection: "row",
    gap: 18,
    flexWrap: "wrap",
    alignItems: "center",
  },
  menuCompact: {
    gap: 10,
  },
  menuLink: {
    fontWeight: "700",
    fontSize: 13.5,
    letterSpacing: 0.1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    padding: 22,
    paddingBottom: 56,
    gap: 6,
  },
  contentCompact: {
    paddingHorizontal: 14,
  },
  pageHeader: {
    padding: 32,
    borderRadius: 16, // Changed from 24 to 16 for a more sleek look
    borderWidth: 1,
    marginBottom: 24,
    marginTop: 12,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    // Shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  headerAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 12,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  subtitle: {
    lineHeight: 24,
    fontSize: 15,
    textAlign: "center",
    maxWidth: 700,
  },
});
