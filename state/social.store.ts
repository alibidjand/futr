import create from "zustand";

export interface InitialFormData {
  conversationDownloadsEnabled: boolean;
  conversationClearEnabled: boolean;
  collectUserInfoEnabled: boolean;
  showLiveChatIcon: boolean;
  conversationTranscripts: {
    emailEnabled: boolean;
    emailAddress: string;
    emailFrequency: string;
  };
  initMessage: boolean;
}

interface FurtStore {
  themMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  initialFormData: InitialFormData;
  setInitialFormData: (addInitialFormData: InitialFormData) => void;
}

export const useFurtStore = create<FurtStore>((set, get) => ({
  themMode: "light",
  setThemeMode: (mode: "dark" | "light") => {
    set((state) => ({
      ...state,
      themMode: mode,
    }));
  },
  initialFormData: {
    conversationDownloadsEnabled: false,
    conversationClearEnabled: false,
    collectUserInfoEnabled: false,
    showLiveChatIcon: false,
    conversationTranscripts: {
      emailEnabled: false,
      emailAddress: "ali.bidjandy@gmail.com",
      emailFrequency: "DAILY",
    },
    initMessage: false,
  },
  setInitialFormData: (addInitialFormData: InitialFormData) => {
    set((state) => ({
      ...state,
      initialFormData: addInitialFormData,
    }));
  },
}));
