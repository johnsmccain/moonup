export const moonUpMarketABI = [
  {
    type: "function",
    name: "buy",
    inputs: [
      { name: "minExpected", type: "uint256", internalType: "uint256" }
    ],
    outputs: [],
    stateMutability: "payable"
  },
  // ... rest of the market ABI
] as const;