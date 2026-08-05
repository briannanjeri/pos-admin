// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  type PersistConfig,
} from "redux-persist";
import { createTransform } from "redux-persist";
import storage from "./storage";
import rootReducer from "./rootReducer";
import type { RootState } from "./rootReducer";

// strip access token before persisting — never save it to localStorage
const authTransform = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    accessToken: null, // ← token always cleared before save
  }),
  (outboundState) => outboundState,
  { whitelist: ["auth"] },
);

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [authTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type { RootState };

export const persistor = persistStore(store);
export default store;
