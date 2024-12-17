// import React from 'react';
import { Wallet } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';

export function WalletConnect() {
  const { isConnected, address, connect } = useWalletStore();
  // const {connect: wagmiConnect} = useConnect()
  // const { open, close } = useAppKit()
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  const handleConnectWallet = async() => {
    // open()
    connect()
  }

  return (
    <button
      onClick={handleConnectWallet}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
    >
      {/* <appkit-button /> */}
      <Wallet className="w-5 h-5" />
      {isConnected ? formatAddress(address!) : 'Connect Wallet'} 
    </button>
  );
}