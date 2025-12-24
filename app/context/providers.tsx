"use client";

import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./AuthProvider";
import { UserItemsProvider } from "./UserItemsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserItemsProvider>
        {children}
        <Toaster />
      </UserItemsProvider>
    </AuthProvider>
  );
}
