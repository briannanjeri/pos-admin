import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTenants,fetchTenantBySlug ,fetchMyTenant} from "@/utils/api/tenants/tenants";
import type {
  TenantListItem,
  TenantDetail,
  FetchTenantsParams,
} from "@/types/tenant";

interface TenantsState {
  list: {
    items: TenantListItem[];
    count: number;
    next: string | null;
    previous: string | null;
    page: number;
    search: string;
    loading: boolean;
    error: string | null;
  };
  detail: {
    data: TenantDetail | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: TenantsState = {
  list: {
    items: [],
    count: 0,
    next: null,
    previous: null,
    page: 1,
    search: "",
    loading: false,
    error: null,
  },
  detail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const loadTenants = createAsyncThunk(
  "tenants/loadTenants",
  async (params: FetchTenantsParams, { rejectWithValue }) => {
    try {
      const data = await fetchTenants(params);
      return { data, page: params.page ?? 1, search: params.search ?? "" };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load tenants.",
      );
    }
  },
);

export const loadTenantDetail = createAsyncThunk(
  "tenants/loadTenantDetail",
  async (slug: string, { rejectWithValue }) => {
    try {
      return await fetchTenantBySlug(slug);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load tenant.",
      );
    }
  },
);
export const loadMyTenant = createAsyncThunk(
  "tenants/loadMyTenant",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMyTenant();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load your tenant.",
      );
    }
  },
);
const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    clearTenantDetail(state) {
      state.detail.data = null;
      state.detail.error = null;
    },
    setTenantsSearch(state, action: PayloadAction<string>) {
      state.list.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTenants.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(loadTenants.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.items = action.payload.data.results;
        state.list.count = action.payload.data.count;
        state.list.next = action.payload.data.next;
        state.list.previous = action.payload.data.previous;
        state.list.page = action.payload.page;
        state.list.search = action.payload.search;
      })
      .addCase(loadTenants.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload as string;
      })
      .addCase(loadTenantDetail.pending, (state) => {
        state.detail.loading = true;
        state.detail.error = null;
      })
      .addCase(loadTenantDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.data = action.payload;
      })
      .addCase(loadTenantDetail.rejected, (state, action) => {
        state.detail.loading = false;
        state.detail.error = action.payload as string;
      })
      .addCase(loadMyTenant.pending, (state) => {
    state.detail.loading = true;
    state.detail.error = null;
  })
  .addCase(loadMyTenant.fulfilled, (state, action) => {
    state.detail.loading = false;
    state.detail.data = action.payload;
  })
  .addCase(loadMyTenant.rejected, (state, action) => {
    state.detail.loading = false;
    state.detail.error = action.payload as string;
  });
  },
});

export const { clearTenantDetail, setTenantsSearch } = tenantsSlice.actions;
export default tenantsSlice.reducer;
