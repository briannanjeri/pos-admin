// src/types/tenant.ts
export interface OnboardTenantData {
  businessName: string;
  slug: string;
  businessEmail: string;
  phone: string;
  businessType: string;
  plan: string;
  address: string;
  adminName: string;
  adminEmail: string;
}
export interface OnboardingMeta {
  businessTypes: string[];
  plans: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export type TenantFormErrors = Partial<OnboardTenantData>;

export const INITIAL_TENANT_FORM: OnboardTenantData = {
  businessName: "",
  businessEmail: "",
  phone: "",
  businessType: "",
  address: "",
  plan: "",
  slug: "",
  adminName: "",
  adminEmail: "",
};

export type MemberStatus = "active" | "pending" | "expired";

export interface TenantMember {
  id: number;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  role: string;
  permissions: string[];
  status: MemberStatus;
  invited_at?: string;
  expires_at?: string;
}

export interface TenantDetailInfo {
  business_email: string;
  phone: string;
  business_type: string;
  address: string;
  plan: string;
  created_at: string;
  updated_at: string;
}

// Shape returned by GET /tenants/{slug}/
export interface TenantDetail {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  detail: TenantDetailInfo | null;
  active_member_count: number;
  inactive_member_count: number;
  pending_invite_count: number;
  members: TenantMember[];
}

// Shape returned by each item in GET /tenants/?page=&search=
export interface TenantListItem {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  business_email: string;
  plan: string;
  member_count: number;
  pending_invite_count: number;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type TenantListResponse = PaginatedResponse<TenantListItem>;

export interface FetchTenantsParams {
  page?: number;
  search?: string;
  page_size?: number;
}

export interface StaffMember {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  custom_permissions: string[];
  created_by: string | null;
}

export interface StaffListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: StaffMember[];
}

export interface TenantAdminState {
  stats: Record<string, unknown> | null;
  staff: StaffListResponse;
  loading: boolean;
  error: unknown;
}

export interface PublicStaffMember {
  username: string;
}

export interface PublicStaffListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PublicStaffMember[];
}