import type { RootState } from "@/redux/store";

// List selectors
export const selectTenantList = (state: RootState) => state.tenants.list.items;
export const selectTenantListCount = (state: RootState) =>
  state.tenants.list.count;
export const selectTenantListPage = (state: RootState) =>
  state.tenants.list.page;
export const selectTenantListSearch = (state: RootState) =>
  state.tenants.list.search;
export const selectTenantListLoading = (state: RootState) =>
  state.tenants.list.loading;
export const selectTenantListError = (state: RootState) =>
  state.tenants.list.error;
export const selectTenantListHasNext = (state: RootState) =>
  !!state.tenants.list.next;
export const selectTenantListHasPrevious = (state: RootState) =>
  !!state.tenants.list.previous;

// Detail selectors
export const selectTenantDetail = (state: RootState) =>
  state.tenants.detail.data;
export const selectTenantDetailLoading = (state: RootState) =>
  state.tenants.detail.loading;
export const selectTenantDetailError = (state: RootState) =>
  state.tenants.detail.error;
