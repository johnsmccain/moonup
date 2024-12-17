export const moonUpTokenABI = [
  {
    type: "constructor",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "_metadataURI", type: "string", internalType: "string" }
    ],
    stateMutability: "nonpayable"
  },
  // ... rest of the token ABI
] as const;