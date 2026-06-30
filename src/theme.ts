export type ThemeMode = "dark" | "light";

export type ThemePalette = {
  bg: string;
  bgSoft: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  border: string;
  danger: string;
  success: string;
  shadow: string;
};

export const darkPalette: ThemePalette = {
  bg: "#0A0A0A",
  bgSoft: "#141414",
  surface: "#1C1C1C",
  surfaceAlt: "#262626",
  text: "#F0F0F0",
  muted: "#8A8A8A",
  accent: "#D4AF37", // Elegant gold
  accentSoft: "rgba(212, 175, 55, 0.1)",
  border: "rgba(255,255,255,0.08)",
  danger: "#E53935",
  success: "#43A047",
  shadow: "rgba(0,0,0,0.5)"
};

export const lightPalette: ThemePalette = {
  bg: "#F9FAFB",
  bgSoft: "#F3F4F6",
  surface: "#FFFFFF",
  surfaceAlt: "#FDFDFD",
  text: "#111827",
  muted: "#6B7280",
  accent: "#B8860B", // Dark goldenrod
  accentSoft: "rgba(184, 134, 11, 0.08)",
  border: "rgba(0,0,0,0.06)",
  danger: "#DC2626",
  success: "#059669",
  shadow: "rgba(0,0,0,0.06)"
};

export const theme = {
  darkPalette,
  lightPalette
};
