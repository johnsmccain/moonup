import { type Address } from 'viem';

export interface ContractConfig {
  address: Address;
  abi: readonly any[];
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  balance?: bigint;
}