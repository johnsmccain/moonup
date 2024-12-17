import { useMemo } from 'react';
import { useTokenStore } from '../store/useTokenStore';


export function useTokenList() {
  // const { tokens, searchQuery, sortBy, filterBy } = useTokenStore();
// console.log(tokens)
//   const filteredTokens = useMemo(() => {
//     let filtered = [...tokens];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         token =>
//           token.name.toLowerCase().includes(query) ||
//           token.symbol.toLowerCase().includes(query)
//       );
//     }

//     // Apply category filter
//     switch (filterBy) {
//       case 'gainers':
//         filtered = filtered.filter(token => token?.priceChange24h > 0);
//         break;
//       case 'losers':
//         filtered = filtered.filter(token => token?.priceChange24h < 0);
//         break;
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case 'marketCap':
//         filtered.sort((a, b) => b.marketCap  - a.marketCap);
//         break;
//       case 'price':
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case 'priceChange':
//         filtered.sort((a, b) => b.priceChange24h - a.priceChange24h);
//         break;
//     }

//     return filtered;
//   }, [tokens, searchQuery, sortBy, filterBy]);

  return ["filteredTokens"];
}