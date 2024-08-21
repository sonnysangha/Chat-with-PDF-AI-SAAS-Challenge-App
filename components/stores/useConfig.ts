import { create } from "zustand";

interface ConfigState {
  isGemini: boolean;
  setIsGemini: (isGemini: boolean) => void;
  openAIKey: string | null;
  setOpenAIKey: (openApiKey: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  isGemini: true,
  setIsGemini: (isGemini: boolean) => {
    set({ isGemini });
  },
  openAIKey: null,
  setOpenAIKey: (openApiKey: string) => {
    if (openApiKey) {
      set({ openAIKey: openApiKey });
    } else {
      set({ openAIKey: null });
    }
  },
}));
