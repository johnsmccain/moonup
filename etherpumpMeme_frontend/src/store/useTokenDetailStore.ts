import { create } from 'zustand';
import { transactions, messages, holders } from '../data/dummyData';
import type { Transaction, Message, Holder } from '../types';

interface TokenDetailStore {
  transactions: Transaction[];
  messages: Message[];
  holders: Holder[];
  fetchTransactions: (tokenId: string) => void;
  fetchMessages: (tokenId: string) => void;
  fetchHolders: (tokenId: string) => void;
  sendMessage: (text: string) => void;
}

export const useTokenDetailStore = create<TokenDetailStore>((set, get) => ({
  transactions: [],
  messages: [],
  holders: [],

  fetchTransactions: (tokenId: string) => {
    setTimeout(() => {
      set({ transactions });
    }, 500);
  },

  fetchMessages: (tokenId: string) => {
    setTimeout(() => {
      set({ messages });
    }, 500);
  },

  fetchHolders: (tokenId: string) => {
    setTimeout(() => {
      set({ holders });
    }, 500);
  },

  sendMessage: (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: '0xYour...Address',
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
}));