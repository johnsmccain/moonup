import { CONTRACTS } from '../config/contracts';
import { 
  moonUpFactoryABI, 
  moonUpMarketABI, 
  moonUpTokenABI, 
  moonUpProxyABI 
} from '../config/abis';
import type { ContractConfig } from './types';

export const contracts = {
  moonUpFactory: {
    address: CONTRACTS.MOONUP_FACTORY,
    abi: moonUpFactoryABI
  },
  moonUpMarket: {
    address: CONTRACTS.MOONUP_MARKET,
    abi: moonUpMarketABI
  }
} as const;