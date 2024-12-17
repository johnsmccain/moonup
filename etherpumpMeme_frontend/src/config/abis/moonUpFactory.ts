export const moonUpFactoryABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_feeToSetter", type: "address", internalType: "address" },
      { name: "_creationFee", type: "uint256", internalType: "uint256" },
      { name: "_weth", type: "address", internalType: "contract IWETH" },
      { name: "_nfpm", type: "address", internalType: "address" },
      { name: "_uFactory", type: "address", internalType: "address" },
      { name: "_total_Trade_Volume", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "nonpayable"
  },
  // ... rest of the factory ABI
] as const;