// src/api/tenants.ts
import {
  OnboardingMeta,
  OnboardTenantData,
  TenantListResponse,
  TenantDetail,
  FetchTenantsParams,
} from "@/types/tenant";
import api from "@/utils/api/axiosInstance";

// Get dynamic metadata (business types + plans)
export const getOnboardingMeta = async (): Promise<OnboardingMeta> => {
  const { data } = await api.get("/tenants/onboarding-meta/");
  console.log("Metadata received:", data);
  return data;
};

// Create new tenant
export const onboardTenant = async (payload: OnboardTenantData) => {
  const { data } = await api.post("/tenants/onboard/", payload);
  console.log("Tenant created:", data);
  return data;
};

export async function fetchTenants(
  params: FetchTenantsParams = {},
): Promise<TenantListResponse> {
  const res = await api.get<TenantListResponse>("tenants/", { params });
  return res.data;
}

export async function fetchTenantBySlug(slug: string): Promise<TenantDetail> {
  const res = await api.get<TenantDetail>(`tenants/${slug}/`);
  return res.data;
}
export async function fetchMyTenant(): Promise<TenantDetail> {
  const res = await api.get<TenantDetail>("tenants/me/");
  return res.data;
}
export const getTenantBySlug = async (tenantSlug: string) => {
  const res = await api.get(`/tenants/by-slug/${tenantSlug}/`);
  return res.data; 
};