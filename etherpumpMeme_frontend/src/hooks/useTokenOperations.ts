// import { useCallback } from 'react';
// import { useContracts } from './useContracts';
// import { parseEther } from 'viem';

// export function useTokenOperations() {
//   const { getWriteContract, getReadOnlyContract } = useContracts();

//   const createToken = useCallback(async (
//     name: string,
//     symbol: string,
//     metadataURI: string,
//     minExpected: bigint,
//     buy: boolean
//   ) => {
//     const contract = getWriteContract('moonUpFactory');
//     if (!contract) throw new Error('Wallet not connected');

//     return contract.write.createTokensAndPair([
//       name,
//       symbol,
//       metadataURI,
//       minExpected,
//       buy
//     ], {
//       value: parseEther('0.01') // Example creation fee
//     });
//   }, [getWriteContract]);

//   const buyToken = useCallback(async (
//     minExpected: bigint,
//     value: bigint
//   ) => {
//     const contract = getWriteContract('moonUpMarket');
//     if (!contract) throw new Error('Wallet not connected');

//     return contract.write.buy([minExpected], {
//       value
//     });
//   }, [getWriteContract]);

//   return {
//     createToken,
//     buyToken,
//   };
// }