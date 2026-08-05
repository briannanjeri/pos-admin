// src/types/auth.ts
export type Role = "super_admin" | "tenant_admin" | "staff";

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
  tenant: Tenant | null;
}

export interface AuthState {
  user: any | null;
  role: string | null;
  tenant: any | null;
  permissions: string[];

  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  user: User;
}
