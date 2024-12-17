export interface ITokenInfo {
    address: `0x${string}`;
    creator: `0x${string}`;
    curveAddr: `0x${string}`;
    createdBlock: string;
    name: string;
    symbol: string;
    totalSupply: number;
    description?: string;
    image: string;
    website?: string;
    telegram?: string;
    twitter?: string;
    roomId?: string;
    roomIdExpiration?: number;
    replies?: string[];
    priceChange24h?: number;
}

export interface IFormData {
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    website: string;
    twitter: string;
    telegram: string;
    minExpectedAmount: string;
    creationFee: string;
    file: File | null | string;
    isBuy: boolean;
  }
  
