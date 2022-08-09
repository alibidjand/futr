import create from "zustand";

const HISTORY_LS_KEY = "history_page";
const CUR_LS_KEY = "wallet";

interface SocialStore {
  themMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  addAccordion: boolean;
  setAddAccordion: (addAccordion: boolean) => void;
  addNewSocial: boolean;
  setAddNewSocial: (addNewSocial: boolean) => void;
  // addressBarSymbol: string;
  // setAddressBarSymbol: (symbol: string) => void;
  // tabNumber: string;
  // setTabNumber: (num: string) => void;
  // setHistoryTransition: (res: boolean) => void;
  // historyTransition: boolean;
  // selectedDropdownCrypto: string;
  // setSelectedDropdownCrypto: (res: string) => void;
  // curHistory: Partial<UserAssets>;
  // setCurHistory: (cur: UserAssets | null) => void;
  // availableAssets: UserAssets[];
  // setAvailableAssets: (cur: UserAssets[]) => void;
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

  // availableAssets: null,
  // setAvailableAssets: (cur: UserAssets[]) =>
  //   set((state) => ({ ...state, availableAssets: cur })),
  // addressBarSymbol: "",
  // setAddressBarSymbol: (symbol: string) =>
  //   set((state) => ({ ...state, addressBarSymbol: symbol })),
  // tabNumber: "1",
  // setTabNumber: (num: string) => set((state) => ({ ...state, tabNumber: num })),
  // selectedDropdownCrypto: "",
  // setSelectedDropdownCrypto: (res) =>
  //   set((state) => {
  //     return { ...state, selectedDropdownCrypto: res };
  //   }),
  // historyTransition: false,
  // setHistoryTransition: (res) =>
  //   set((state) => {
  //     return { ...state, historyTransition: res };
  //   }),
  // curHistory: {},
  // setCurHistory: (res) =>
  //   set((state) => {
  //     return { ...state, curHistory: res };
  //   }),
}));
