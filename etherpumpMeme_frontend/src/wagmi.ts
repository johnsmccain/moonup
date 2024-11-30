import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
} from 'wagmi/chains';



export const config = getDefaultConfig({
  appName: 'MoonUp',
  projectId: '602fa2d218dad279c7df08b58b46f594',
  chains: [mainnet, sepolia, polygon, optimism, arbitrum],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});

