export const moonUpProxyABI = [
  {
    type: "constructor",
    inputs: [
      { name: "beacon", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" }
    ],
    stateMutability: "payable"
  },
  // ... rest of the proxy ABI
] as const;