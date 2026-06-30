import { Activity, OrgMember, Partner, Product } from "../types";
import { getAuthToken } from "./authToken";

const baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    }),

  getProducts: () => request<Product[]>("/products"),
  createProduct: (payload: Partial<Product>) =>
    request<Product>("/products", { method: "POST", body: JSON.stringify(payload) }),
  updateProduct: (id: number, payload: Partial<Product>) =>
    request<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteProduct: (id: number) => request<{ ok: true }>(`/products/${id}`, { method: "DELETE" }),

  getActivities: () => request<Activity[]>("/activities"),
  createActivity: (payload: Partial<Activity>) =>
    request<Activity>("/activities", { method: "POST", body: JSON.stringify(payload) }),
  updateActivity: (id: number, payload: Partial<Activity>) =>
    request<Activity>(`/activities/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteActivity: (id: number) => request<{ ok: true }>(`/activities/${id}`, { method: "DELETE" }),

  getPartners: () => request<Partner[]>("/partners"),
  createPartner: (payload: Partial<Partner>) =>
    request<Partner>("/partners", { method: "POST", body: JSON.stringify(payload) }),
  updatePartner: (id: number, payload: Partial<Partner>) =>
    request<Partner>(`/partners/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deletePartner: (id: number) => request<{ ok: true }>(`/partners/${id}`, { method: "DELETE" }),

  getOrgMembers: () => request<OrgMember[]>("/organization-members"),
  createOrgMember: (payload: Partial<OrgMember>) =>
    request<OrgMember>("/organization-members", { method: "POST", body: JSON.stringify(payload) }),
  updateOrgMember: (id: number, payload: Partial<OrgMember>) =>
    request<OrgMember>(`/organization-members/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteOrgMember: (id: number) =>
    request<{ ok: true }>(`/organization-members/${id}`, { method: "DELETE" })
};
