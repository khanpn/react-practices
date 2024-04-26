import { create } from "zustand";
import { GameQuery } from "./models/gameQuery";

interface GlobalSearchStore {
  searchText?: string;
  setSearchText: (searchText?: string) => void;
}

const useGlobalSearchStore = create<GlobalSearchStore>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set(() => ({ searchText })),
}));

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenres: (genres?: string[]) => void;
  setPlatforms: (platforms?: string[]) => void;
  setSortOrder: (sortOrder?: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setGenres: (genres) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, genres: genres } })),
  setPlatforms: (platforms) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, platforms: platforms },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, sortOrder: sortOrder },
    })),
}));

export { useGlobalSearchStore, useGameQueryStore };
