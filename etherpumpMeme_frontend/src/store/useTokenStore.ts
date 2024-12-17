import { create } from 'zustand';
import { ITokenInfo } from '../types';
import { fetchDynamicData } from '../utils/api';

interface TokenStore {
  tokens: ITokenInfo[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: string;
  filterBy: string;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setFilterBy: (filter: string) => void;
  fetchTokens: () => Promise<void>;
}

export const useTokenStore = create<TokenStore>((set, _) => ({
  tokens: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  sortBy: 'marketCap',
  filterBy: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setFilterBy: (filter) => set({ filterBy: filter }),

  fetchTokens: async () => {
    set({ isLoading: true, error: null });
    try {
      // Replace 'https://api.example.com/tokens' with your backend API endpoint
      await fetch('http://localhost:9000/api/tokens');
      fetchDynamicData("/api/tokens", { params: { category: "", limit: 15 } }).then((res:any) => {

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        // const data: ITokenInfo[] = await response.json();

        // Update the tokens state
        set({ tokens: res, isLoading: false });
      })

    } catch (error: any) {
      // Handle errors
      set({ error: error.message, isLoading: false });
    }
  },
}));
