import create from "zustand";

interface SocialStore {
  themMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  addAccordion: boolean;
  setAddAccordion: (addAccordion: boolean) => void;
  addNewSocial: boolean;
  setAddNewSocial: (addNewSocial: boolean) => void;
}

export const useSocialStore = create<SocialStore>((set, get) => ({
  themMode: "light",
  setThemeMode: (mode: "dark" | "light") => {
    set((state) => ({
      ...state,
      themMode: mode,
    }));
  },
  addAccordion: false,
  setAddAccordion: (addAccordion: boolean) => {
    set((state) => ({
      ...state,
      addAccordion,
    }));
  },
  addNewSocial: false,
  setAddNewSocial: (addNewSocial: boolean) => {
    set((state) => ({
      ...state,
      addNewSocial,
    }));
  },
}));
