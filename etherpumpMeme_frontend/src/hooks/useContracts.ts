import { usePublicClient, useWalletClient } from 'wagmi';
import { contracts } from '../contracts/instances';
import { getContract } from 'viem';

export function useContracts() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const getReadOnlyContract = (name: keyof typeof contracts) => {
    return getContract({
      address: contracts[name].address,
      abi: contracts[name].abi,
      publicClient,
    });
  };

  const getWriteContract = (name: keyof typeof contracts) => {
    if (!walletClient) return null;
    
    return getContract({
      address: contracts[name].address,
      abi: contracts[name].abi,
      walletClient,
    });
  };

  return {
    getReadOnlyContract,
    getWriteContract,
  };
}