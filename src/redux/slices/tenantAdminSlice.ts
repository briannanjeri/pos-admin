import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getStaffList } from "@/utils/api/store/staffApi";
import { StaffMember, StaffListResponse } from "@/types/tenant";
interface TenantAdminState {
  stats: Record<string, unknown> | null;
  staff: StaffListResponse;
  loading: boolean;
  error: unknown;
}

const initialState: TenantAdminState = {
  stats: null,
  staff: { results: [], count: 0, next: null, previous: null },
  loading: false,
  error: null,
};

export const fetchStaffList = createAsyncThunk<
  StaffListResponse,
  number | undefined,
  { rejectValue: unknown }
>(
  "tenantAdmin/fetchStaffList",
  async (page = 1, { rejectWithValue }) => {
    try {
      return await getStaffList(page);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const tenantAdminSlice = createSlice({
  name: "tenantAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffList.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchStaffList.fulfilled,
        (state, action: PayloadAction<StaffListResponse>) => {
          state.staff = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchStaffList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default tenantAdminSlice.reducer;
