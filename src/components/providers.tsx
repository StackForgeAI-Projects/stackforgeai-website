"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "!bg-[color:var(--surface)]/95 !backdrop-blur-md !border-[color:var(--border)] !text-foreground !rounded-2xl",
            description: "!text-muted-foreground",
            actionButton: "!bg-primary !text-primary-foreground",
            cancelButton: "!bg-surface !text-foreground",
          },
        }}
      />
    </LanguageProvider>
  );
}
