"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./index";
import { Session } from "next-auth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
