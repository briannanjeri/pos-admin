import { RootState } from "@/redux/store"; // adjust path if your store file lives elsewhere

export const selectTenantAdminStaff = (state: RootState) =>
  state.tenantAdmin.staff;
export const selectTenantAdminStaffResults = (state: RootState) =>
  state.tenantAdmin.staff.results;
export const selectTenantAdminLoading = (state: RootState) =>
  state.tenantAdmin.loading;
export const selectTenantAdminError = (state: RootState) =>
  state.tenantAdmin.error;
export const selectTenantAdminStats = (state: RootState) =>
  state.tenantAdmin.stats;
