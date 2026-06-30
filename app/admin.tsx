import { router } from "expo-router";
import { useMemo, useState, type ReactNode } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BrandMark } from "../src/components/BrandMark";
import { ImageFileInput } from "../src/components/ImageFileInput";
import { LinkRepeater } from "../src/components/LinkRepeater";
import { PageShell } from "../src/components/PageShell";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { SectionHeader } from "../src/components/SectionHeader";
import { SurfaceCard } from "../src/components/SurfaceCard";
import { useAppData } from "../src/context/AppDataContext";
import { useAuth } from "../src/context/AuthContext";
import { useTheme } from "../src/context/ThemeContext";
import { api } from "../src/lib/api";
import { Activity, MarketplaceLink, OrgMember, Partner, Product, SocialLink } from "../src/types";

type Tab = "produk" | "kegiatan" | "mitra" | "struktur";

export default function AdminPage() {
  const { palette } = useTheme();
  const { isAuthed, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("produk");
  const {
    products,
    activities,
    partners,
    orgMembers,
    setProducts,
    setActivities,
    setPartners,
    setOrgMembers
  } = useAppData();

  if (!isAuthed) {
    return (
      <PageShell title="Akses Admin" subtitle="Silakan login dulu sebelum membuka halaman pengelolaan data.">
        <SurfaceCard>
          <View style={styles.lockPanel}>
            <BrandMark />
            <Text style={[styles.lockTitle, { color: palette.text }]}>Login diperlukan</Text>
            <Text style={[styles.lockText, { color: palette.muted }]}>
              Halaman admin disembunyikan dari navigasi umum dan hanya bisa dipakai setelah login.
            </Text>
            <View style={styles.lockActions}>
              <Pressable onPress={() => router.replace("/login")} style={styles.loginLink}>
                <Text style={styles.loginLinkText}>Ke Halaman Login</Text>
              </Pressable>
            </View>
          </View>
        </SurfaceCard>
      </PageShell>
    );
  }

  return (
    <PageShell title="" subtitle="">
      <View style={styles.adminTop}>
        <View>
          <Text style={[styles.adminTitle, { color: palette.text }]}>Admin Panel</Text>
          <Text style={[styles.adminSubtitle, { color: palette.muted }]}>
            Kelola produk, kegiatan, mitra, dan struktur organisasi.
          </Text>
        </View>
        <Pressable onPress={() => { logout(); router.replace("/login"); }} style={[styles.logoutBtn, { borderColor: palette.accent }]}>
          <Text style={{ color: palette.accent, fontWeight: "800" }}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.tabs}>
        {(["produk", "kegiatan", "mitra", "struktur"] as Tab[]).map((item) => (
          <Pressable
            key={item}
            onPress={() => setTab(item)}
            style={[styles.tab, { backgroundColor: palette.surfaceAlt, borderColor: palette.border }, tab === item && { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}
          >
            <Text style={{ color: tab === item ? palette.accent : palette.text, fontWeight: "800" }}>{labelTab(item)}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "produk" ? (
        <CrudProducts data={products} onChange={setProducts} />
      ) : null}

      {tab === "kegiatan" ? (
        <CrudActivities data={activities} onChange={setActivities} />
      ) : null}

      {tab === "mitra" ? (
        <CrudPartners data={partners} onChange={setPartners} />
      ) : null}

      {tab === "struktur" ? (
        <CrudOrg data={orgMembers} onChange={setOrgMembers} />
      ) : null}
    </PageShell>
  );
}

function CrudProducts({ data, onChange }: { data: Product[]; onChange: (value: Product[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Product>>({ marketLinks: [] });

  const save = async () => {
    const payload = { ...form, marketLinks: form.marketLinks || [] };
    try {
      const saved = editingId ? await api.updateProduct(editingId, payload) : await api.createProduct(payload);
      onChange(editingId ? data.map((row) => (row.id === editingId ? saved : row)) : [saved, ...data]);
    } catch {
      const fallback = { ...(payload as Product), id: editingId || Date.now() };
      onChange(editingId ? data.map((row) => (row.id === editingId ? fallback : row)) : [fallback, ...data]);
    }
    setForm({ marketLinks: [] });
    setEditingId(null);
  };

  return (
    <View style={styles.sectionWrap}>
      <SectionHeader title="CRUD Produk" subtitle="Nama produk, gambar file, deskripsi, harga, dan link marketplace." />
      <CrudFormCard>
        <Field label="Nama Produk" value={form.name || ""} onChangeText={(v) => setForm((p) => ({ ...p, name: v }))} />
        <Field label="Deskripsi" value={form.description || ""} onChangeText={(v) => setForm((p) => ({ ...p, description: v }))} multiline />
        <Field label="Harga" value={form.price != null ? String(form.price) : ""} onChangeText={(v) => setForm((p) => ({ ...p, price: Number(v) }))} keyboardType="numeric" />
        <ImageFileInput value={form.imageUrl} onChange={(v) => setForm((p) => ({ ...p, imageUrl: v }))} />
        <LinkRepeater
          title="Link Marketplace"
          items={(form.marketLinks || []) as MarketplaceLink[]}
          onChange={(items) => setForm((p) => ({ ...p, marketLinks: items as MarketplaceLink[] }))}
          options={[
            { label: "Tokopedia", value: "tokopedia", icon: "🟢" },
            { label: "Shopee", value: "shopee", icon: "🟠" },
            { label: "TikTok Shop", value: "tiktok_shop", icon: "🎵" },
            { label: "Website", value: "website", icon: "↗" }
          ]}
        />
        <PrimaryButton label={editingId ? "Update Produk" : "Tambah Produk"} onPress={save} />
      </CrudFormCard>
      <CrudList
        data={data}
        render={(item) => `${item.name} - Rp${item.price.toLocaleString("id-ID")}`}
        onEdit={(item) => {
          setEditingId(item.id);
          setForm({ ...item });
        }}
        onDelete={async (item) => {
          try {
            await api.deleteProduct(item.id);
          } catch {}
          onChange(data.filter((row) => row.id !== item.id));
        }}
      />
    </View>
  );
}

function CrudActivities({ data, onChange }: { data: Activity[]; onChange: (value: Activity[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Activity>>({});

  const save = async () => {
    const payload = { ...form, gallery: form.gallery || [] };
    try {
      const saved = editingId ? await api.updateActivity(editingId, payload) : await api.createActivity(payload);
      onChange(editingId ? data.map((row) => (row.id === editingId ? saved : row)) : [saved, ...data]);
    } catch {
      const fallback = { ...(payload as Activity), id: editingId || Date.now() };
      onChange(editingId ? data.map((row) => (row.id === editingId ? fallback : row)) : [fallback, ...data]);
    }
    setForm({});
    setEditingId(null);
  };

  return (
    <View style={styles.sectionWrap}>
      <SectionHeader title="CRUD Kegiatan" subtitle="Judul event, deskripsi, gambar file, tanggal, dan lokasi." />
      <CrudFormCard>
        <Field label="Judul Event" value={form.title || ""} onChangeText={(v) => setForm((p) => ({ ...p, title: v }))} />
        <Field label="Deskripsi" value={form.description || ""} onChangeText={(v) => setForm((p) => ({ ...p, description: v }))} multiline />
        <Field label="Tanggal" value={form.date || ""} onChangeText={(v) => setForm((p) => ({ ...p, date: v }))} />
        <Field label="Lokasi" value={form.location || ""} onChangeText={(v) => setForm((p) => ({ ...p, location: v }))} />
        <ImageFileInput value={form.imageUrl} onChange={(v) => setForm((p) => ({ ...p, imageUrl: v }))} />
        <PrimaryButton label={editingId ? "Update Kegiatan" : "Tambah Kegiatan"} onPress={save} />
      </CrudFormCard>
      <CrudList
        data={data}
        render={(item) => `${item.title} - ${item.date}`}
        onEdit={(item) => {
          setEditingId(item.id);
          setForm({ ...item });
        }}
        onDelete={async (item) => {
          try {
            await api.deleteActivity(item.id);
          } catch {}
          onChange(data.filter((row) => row.id !== item.id));
        }}
      />
    </View>
  );
}

function CrudPartners({ data, onChange }: { data: Partner[]; onChange: (value: Partner[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Partner>>({ socialLinks: [] });

  const save = async () => {
    const payload = { ...form, socialLinks: form.socialLinks || [] };
    try {
      const saved = editingId ? await api.updatePartner(editingId, payload) : await api.createPartner(payload);
      onChange(editingId ? data.map((row) => (row.id === editingId ? saved : row)) : [saved, ...data]);
    } catch {
      const fallback = { ...(payload as Partner), id: editingId || Date.now() };
      onChange(editingId ? data.map((row) => (row.id === editingId ? fallback : row)) : [fallback, ...data]);
    }
    setForm({ socialLinks: [] });
    setEditingId(null);
  };

  return (
    <View style={styles.sectionWrap}>
      <SectionHeader title="CRUD Mitra" subtitle="Nama mitra, logo file, deskripsi, dan banyak ikon sosial media." />
      <CrudFormCard>
        <Field label="Nama Mitra" value={form.name || ""} onChangeText={(v) => setForm((p) => ({ ...p, name: v }))} />
        <Field label="Deskripsi" value={form.description || ""} onChangeText={(v) => setForm((p) => ({ ...p, description: v }))} multiline />
        <ImageFileInput value={form.logoUrl} label="Upload Logo" onChange={(v) => setForm((p) => ({ ...p, logoUrl: v }))} />
        <LinkRepeater
          title="Link Sosial Media"
          items={(form.socialLinks || []) as SocialLink[]}
          onChange={(items) => setForm((p) => ({ ...p, socialLinks: items as SocialLink[] }))}
          options={[
            { label: "Instagram", value: "instagram", icon: "📷" },
            { label: "TikTok", value: "tiktok", icon: "🎵" },
            { label: "Facebook", value: "facebook", icon: "f" },
            { label: "YouTube", value: "youtube", icon: "▶" },
            { label: "WhatsApp", value: "whatsapp", icon: "💬" },
            { label: "Website", value: "website", icon: "↗" }
          ]}
        />
        <PrimaryButton label={editingId ? "Update Mitra" : "Tambah Mitra"} onPress={save} />
      </CrudFormCard>
      <CrudList
        data={data}
        render={(item) => item.name}
        onEdit={(item) => {
          setEditingId(item.id);
          setForm({ ...item });
        }}
        onDelete={async (item) => {
          try {
            await api.deletePartner(item.id);
          } catch {}
          onChange(data.filter((row) => row.id !== item.id));
        }}
      />
    </View>
  );
}

function CrudOrg({ data, onChange }: { data: OrgMember[]; onChange: (value: OrgMember[]) => void }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<OrgMember>>({ level: 1, order: 1 });
  const parentOptions = useMemo(() => data.filter((item) => item.id !== editingId), [data, editingId]);
  const selectedParent = form.parentId ? data.find((item) => item.id === Number(form.parentId)) : undefined;

  const save = async () => {
    const parent = form.parentId ? data.find((item) => item.id === Number(form.parentId)) : undefined;
    const payload = {
      ...form,
      level: parent ? parent.level + 1 : 1,
      order: Number(form.order || 1),
      parentId: form.parentId ? Number(form.parentId) : null
    };
    try {
      const saved = editingId ? await api.updateOrgMember(editingId, payload) : await api.createOrgMember(payload);
      onChange(editingId ? data.map((row) => (row.id === editingId ? saved : row)) : [saved, ...data]);
    } catch {
      const fallback = { ...(payload as OrgMember), id: editingId || Date.now() };
      onChange(editingId ? data.map((row) => (row.id === editingId ? fallback : row)) : [fallback, ...data]);
    }
    setForm({ level: 1, order: 1 });
    setEditingId(null);
  };

  return (
    <View style={styles.sectionWrap}>
      <SectionHeader
        title="CRUD Struktur"
        subtitle="Masukkan data karyawan: nama, jabatan, siapa atasannya (jika ada), dan nomor urut tampilnya."
      />
      <CrudFormCard>
        <Field label="Nama" value={form.name || ""} onChangeText={(v) => setForm((p) => ({ ...p, name: v }))} />
        <Field label="Jabatan" value={form.role || ""} onChangeText={(v) => setForm((p) => ({ ...p, role: v }))} />
        <Field
          label="Nomor Urut (1, 2, 3, ...)"
          value={form.order != null ? String(form.order) : ""}
          onChangeText={(v) => setForm((p) => ({ ...p, order: Number(v) }))}
          keyboardType="numeric"
        />
        <Field
          label="ID Atasan (kosongkan jika pimpinan utama)"
          value={form.parentId != null ? String(form.parentId) : ""}
          onChangeText={(v) => setForm((p) => ({ ...p, parentId: v ? Number(v) : null }))}
          keyboardType="numeric"
        />
        <Text style={styles.helper}>
          💡 Jika orang ini adalah pimpinan tertinggi/CEO, kosongkan kolom "ID Atasan". Jika dia punya atasan, isi dengan ID atasannya dari daftar di bawah.
        </Text>
        <Text style={styles.helper}>
          ✓ Atasan terpilih: {selectedParent ? `${selectedParent.name} (${selectedParent.role})` : "Tidak ada → Posisi teratas"}
        </Text>
        <PrimaryButton label={editingId ? "Update Struktur" : "Tambah Struktur"} onPress={save} />
      </CrudFormCard>
      <CrudList
        data={data}
        render={(item) => {
          const parent = item.parentId ? data.find((row) => row.id === item.parentId) : undefined;
          return `${item.name} (${item.role}) → Atasan: ${parent ? parent.name : "Pimpinan utama"} | Urut: ${item.order}`;
        }}
        onEdit={(item) => {
          setEditingId(item.id);
          setForm({ ...item });
        }}
        onDelete={async (item) => {
          try {
            await api.deleteOrgMember(item.id);
          } catch {}
          onChange(data.filter((row) => row.id !== item.id));
        }}
      />
      <Text style={styles.helper}>
        📋 Daftar ID Atasan yang tersedia: {parentOptions.map((item) => `${item.id} = ${item.name}`).join(" | ")}
      </Text>
    </View>
  );
}

function CrudFormCard({ children }: { children: ReactNode }) {
  const { palette } = useTheme();
  return <View style={[styles.formCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>{children}</View>;
}

function Field({
  label,
  value,
  onChangeText,
  multiline,
  keyboardType = "default"
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}) {
  const { palette } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.fieldLabel, { color: palette.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={palette.muted}
        multiline={multiline}
        keyboardType={keyboardType}
        style={[
          styles.input,
          { backgroundColor: palette.surfaceAlt, borderColor: palette.border, color: palette.text },
          multiline && styles.textArea
        ]}
      />
    </View>
  );
}

function CrudList({
  data,
  render,
  onEdit,
  onDelete
}: {
  data: Array<{ id: number }>;
  render: (item: any) => string;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}) {
  const { palette } = useTheme();
  return (
    <View style={styles.list}>
      {data.map((item) => (
        <View key={item.id} style={[styles.listItem, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <Text style={{ color: palette.text, flex: 1 }}>{render(item)}</Text>
          <View style={styles.listActions}>
            <Pressable onPress={() => onEdit(item)} style={[styles.smallBtn, { borderColor: palette.accent }]}>
              <Text style={{ color: palette.accent, fontWeight: "800", fontSize: 12 }}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Alert.alert("Hapus data?", "Aksi ini menghapus item dari daftar.", [
                  { text: "Batal", style: "cancel" },
                  { text: "Hapus", style: "destructive", onPress: () => onDelete(item) }
                ])
              }
              style={[styles.smallBtn, { borderColor: palette.danger }]}
            >
              <Text style={{ color: palette.danger, fontWeight: "800", fontSize: 12 }}>Hapus</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

function labelTab(tab: Tab) {
  switch (tab) {
    case "produk":
      return "Produk";
    case "kegiatan":
      return "Kegiatan";
    case "mitra":
      return "Mitra";
    default:
      return "Struktur";
  }
}

const styles = StyleSheet.create({
  adminTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap"
  },
  adminTitle: {
    fontSize: 28,
    fontWeight: "900"
  },
  adminSubtitle: {
    marginTop: 6
  },
  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 999
  },
  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 999
  },
  sectionWrap: {
    gap: 14
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 12
  },
  field: {
    gap: 6
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "800"
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: "top"
  },
  helper: {
    fontSize: 12,
    lineHeight: 18
  },
  list: {
    gap: 10
  },
  listItem: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  listActions: {
    flexDirection: "row",
    gap: 8
  },
  smallBtn: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  lockPanel: {
    padding: 24,
    alignItems: "center",
    gap: 14
  },
  lockTitle: {
    fontSize: 22,
    fontWeight: "900"
  },
  lockText: {
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 520
  },
  lockActions: {
    flexDirection: "row",
    gap: 10
  },
  loginLink: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#f4c542",
    alignSelf: "flex-start"
  },
  loginLinkText: {
    color: "#1f2329",
    fontWeight: "800"
  }
});
