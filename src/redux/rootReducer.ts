// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tenantsReducer from "@/redux/slices/tenantsSlice";
import tenantAdminReducer from "@/redux/slices/tenantAdminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tenants: tenantsReducer,
  tenantAdmin: tenantAdminReducer,
  // add more reducers here as you build them
  // orders:   ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
