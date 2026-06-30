export type MediaFile = {
  uri: string;
  name?: string;
  size?: number;
  type?: string;
};

export type MarketplacePlatform = "tokopedia" | "shopee" | "tiktok_shop" | "website";

export type SocialPlatform = "instagram" | "tiktok" | "facebook" | "youtube" | "whatsapp" | "website";

export type MarketplaceLink = {
  platform: MarketplacePlatform;
  url: string;
};

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type CompanyProfile = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  heroImageUrl: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  whatsappUrl: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  marketLinks: MarketplaceLink[];
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location?: string;
  gallery?: string[];
};

export type Partner = {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  socialLinks: SocialLink[];
};

export type OrgMember = {
  id: number;
  name: string;
  role: string;
  photoUrl?: string;
  parentId?: number | null;
  level: number;
  order: number;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type DetailItem = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  meta: string[];
  actions?: Array<{
    label: string;
    url: string;
  }>;
};
