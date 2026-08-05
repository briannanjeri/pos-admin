import { RootState } from "@/src/redux/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.user;

export const selectRole = (state: RootState) => state.auth.role;

export const selectTenant = (state: RootState) => state.auth.tenant;

export const selectPermissions = (state: RootState) => state.auth.permissions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
