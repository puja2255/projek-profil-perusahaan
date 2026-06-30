import cors from "cors";
import express from "express";
import crypto from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const app = express();
const port = Number(process.env.PORT || 4000);
const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
const authSecret = process.env.AUTH_SECRET || "golden-ib-secret";

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({ username });
  res.json({ token });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "pt-golden-ib" });
});

app.get("/api/products", async (_req, res) => {
  const data = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  res.json(data);
});

app.post("/api/products", requireAdmin, async (req, res) => {
  const created = await prisma.product.create({
    data: {
      name: req.body.name || "",
      description: req.body.description || "",
      imageUrl: req.body.imageUrl || "",
      price: new Prisma.Decimal(req.body.price || 0),
      marketLinks: req.body.marketLinks || []
    } as any
  });
  res.status(201).json(created);
});

app.put("/api/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price != null ? new Prisma.Decimal(req.body.price) : undefined,
      marketLinks: req.body.marketLinks ?? undefined
    } as any
  });
  res.json(updated);
});

app.delete("/api/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.json({ ok: true });
});

app.get("/api/activities", async (_req, res) => {
  const data = await prisma.activity.findMany({ orderBy: { createdAt: "desc" } });
  res.json(data);
});

app.post("/api/activities", requireAdmin, async (req, res) => {
  const created = await prisma.activity.create({
    data: {
      title: req.body.title || "",
      description: req.body.description || "",
      imageUrl: req.body.imageUrl || "",
      date: req.body.date || "",
      location: req.body.location || null,
      gallery: req.body.gallery || []
    } as any
  });
  res.status(201).json(created);
});

app.put("/api/activities/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.activity.update({
    where: { id },
    data: {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      date: req.body.date,
      location: req.body.location ?? undefined,
      gallery: req.body.gallery ?? undefined
    } as any
  });
  res.json(updated);
});

app.delete("/api/activities/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.activity.delete({ where: { id } });
  res.json({ ok: true });
});

app.get("/api/partners", async (_req, res) => {
  const data = await prisma.partner.findMany({ orderBy: { createdAt: "desc" } });
  res.json(data);
});

app.post("/api/partners", requireAdmin, async (req, res) => {
  const created = await prisma.partner.create({
    data: {
      name: req.body.name || "",
      description: req.body.description || "",
      logoUrl: req.body.logoUrl || "",
      socialLinks: req.body.socialLinks || []
    } as any
  });
  res.status(201).json(created);
});

app.put("/api/partners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.partner.update({
    where: { id },
    data: {
      name: req.body.name,
      description: req.body.description,
      logoUrl: req.body.logoUrl,
      socialLinks: req.body.socialLinks ?? undefined
    } as any
  });
  res.json(updated);
});

app.delete("/api/partners/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.partner.delete({ where: { id } });
  res.json({ ok: true });
});

app.get("/api/organization-members", async (_req, res) => {
  const data = await prisma.organizationMember.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }] as any
  });
  res.json(data);
});

app.post("/api/organization-members", requireAdmin, async (req, res) => {
  const parent = req.body.parentId ? await prisma.organizationMember.findUnique({ where: { id: Number(req.body.parentId) } }) : null;
  const created = await prisma.organizationMember.create({
    data: {
      name: req.body.name || "",
      role: req.body.role || "",
      photoUrl: req.body.photoUrl || null,
      order: Number(req.body.order || 0),
      parentId: req.body.parentId ? Number(req.body.parentId) : null,
      level: parent ? ((parent as any).level + 1) : Number(req.body.level || 1)
    } as any
  });
  res.status(201).json(created);
});

app.put("/api/organization-members/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const parent = req.body.parentId ? await prisma.organizationMember.findUnique({ where: { id: Number(req.body.parentId) } }) : null;
  const updated = await prisma.organizationMember.update({
    where: { id },
    data: {
      name: req.body.name,
      role: req.body.role,
      photoUrl: req.body.photoUrl ?? undefined,
      order: req.body.order != null ? Number(req.body.order) : undefined,
      parentId: req.body.parentId === null ? null : req.body.parentId ? Number(req.body.parentId) : undefined,
      level: parent ? ((parent as any).level + 1) : req.body.level != null ? Number(req.body.level) : undefined
    } as any
  });
  res.json(updated);
});

app.delete("/api/organization-members/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  await prisma.organizationMember.delete({ where: { id } });
  res.json({ ok: true });
});

app.get("/api/company-profile", async (_req, res) => {
  const data = await prisma.companyProfile.findFirst();
  res.json(data);
});

app.put("/api/company-profile/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.companyProfile.update({
    where: { id },
    data: {
      name: req.body.name,
      tagline: req.body.tagline,
      description: req.body.description,
      logoUrl: req.body.logoUrl,
      heroImageUrl: req.body.heroImageUrl,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      instagramUrl: req.body.instagramUrl,
      whatsappUrl: req.body.whatsappUrl
    } as any
  });
  res.json(updated);
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

function signToken(payload: Record<string, string>) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", authSecret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", authSecret).update(body).digest("base64url");
  if (sig.length !== expected.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
