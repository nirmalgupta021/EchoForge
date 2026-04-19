"use client";

import { createContext, useContext } from "react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type TTSVoicesItem = inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface TTSVoicesContextValue {
  customVoices: TTSVoicesItem[];
  systemVoices: TTSVoicesItem[];
  allVoices: TTSVoicesItem[];
};

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);

export function TTSVoicesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TTSVoicesContextValue;
}) {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  );
};

export function useTTSVoices() {
  const context = useContext(TTSVoicesContext);

  if(!context){
    throw new Error("useTTSVoices must be within a TTSVoicesProvider");
  }

  return context;
}