import { create } from 'zustand';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  signer: null,
  provider: null,
  connect: async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      
      set({
        isConnected: true,
        address: accounts[0],
        signer,
        provider,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  },
  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      signer: null,
      provider: null,
    });
  },
}));