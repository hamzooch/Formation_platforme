import { apiGet } from "./api";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TRAINER" | "STUDENT";
  status: "ACTIVE" | "PENDING" | "BLOCKED";
  createdAt: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  active: boolean;
};

export type AdminReport = {
  id: string;
  title: string;
  course: string;
  severity: string;
  status: string;
};

export type UsersResponse = {
  users: AdminUser[];
  page: number;
  pageSize: number;
  total: number;
};

export async function fetchUsers(params?: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.role) query.set("role", params.role);
  if (params?.status) query.set("status", params.status);
  if (params?.page) query.set("page", String(params.page));
  if (params?.pageSize) query.set("pageSize", String(params.pageSize));
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiGet<UsersResponse>(`/admin/users${suffix}`);
}

export async function fetchCategories(params?: { search?: string; active?: string }) {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.active) query.set("active", params.active);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiGet<{ categories: AdminCategory[] }>(`/admin/categories${suffix}`);
}

export async function fetchReports() {
  return apiGet<{ reports: AdminReport[] }>("/admin/reports");
}

export async function updateUserStatus(id: string, status: "active" | "blocked" | "pending") {
  const response = await fetch(`http://localhost:4000/api/admin/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
}

export async function updateCategory(payload: {
  id: string;
  name?: string;
  active?: boolean;
}) {
  const response = await fetch("http://localhost:4000/api/admin/categories", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
}

export async function createCategory(name: string) {
  const response = await fetch("http://localhost:4000/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}
