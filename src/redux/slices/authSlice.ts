// src/redux/slices/authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api/axiosInstance"

import { AuthState, LoginCredentials } from "@/types/auth";

//
// ================= LOGIN =================
//
export const login = createAsyncThunk(
  "/auth/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "users/auth/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error: any) {
      console.log('error', error)
      return rejectWithValue(error.response?.data);
    }
  }
);

//
// ================= LOAD SESSION =================
//
export const loadSession = createAsyncThunk(
  "auth/loadSession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("users/auth/me/", {
        withCredentials: true,
      });

      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

//
// ================= LOGOUT =================
//
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(
        "users/auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState: AuthState = {
  user: null,
  role: null,
  tenant: null,
  permissions: [],
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.role = null;
      state.tenant = null;
      state.permissions = [];

      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    //
    // LOGIN
    //
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.user;

        state.user = user;
        state.role = user.role;
        state.tenant = user.tenant;
        state.permissions = user.permissions || [];

        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    //
    // LOAD SESSION
    //
    builder
      .addCase(loadSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
        state.tenant = action.payload.tenant;
        state.permissions = action.payload.permissions || [];

        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadSession.rejected, (state) => {
        state.user = null;
        state.role = null;
        state.tenant = null;
        state.permissions = [];

        state.isAuthenticated = false;
        state.isLoading = false;
      });

    //
    // LOGOUT
    //
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.role = null;
      state.tenant = null;
      state.permissions = [];

      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;

