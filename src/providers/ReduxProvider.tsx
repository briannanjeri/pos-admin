"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthBootstrap from "../components/auth/AuthBootstrap";
import store,  { persistor } from "@/redux/store";


// src/providers/QueryProvider.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          staleTime: 60 * 1000,        // 1 minute
          gcTime: 5 * 60 * 1000,       // 5 minutes (new name for cacheTime)
        },
        mutations: {
          retry: false,                // Good for most cases
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthBootstrap />
        {children}
      </PersistGate>
    </Provider>
  );
}