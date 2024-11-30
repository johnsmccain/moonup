const contractABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_feeToSetter",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_creationFee",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_weth",
        "type": "address",
        "internalType": "contract IWETH"
      },
      { "name": "_nfpm", "type": "address", "internalType": "address" },
      { "name": "_uFactory", "type": "address", "internalType": "address" },
      {
        "name": "_total_Trade_Volume",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  { "type": "receive", "stateMutability": "payable" },
  {
    "type": "function",
    "name": "CREATION_FEE",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allPairsLength",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createTokensAndPair",
    "inputs": [
      { "name": "name", "type": "string", "internalType": "string" },
      { "name": "symbol", "type": "string", "internalType": "string" },
      { "name": "minExpected", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "feeToSetter",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMoonUpTokenPair",
    "inputs": [
      { "name": "Token", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setCreationFeeSetter",
    "inputs": [
      { "name": "_feeToSetter", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setCreationFeeTo",
    "inputs": [
      { "name": "_feeTo", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      { "name": "newOwner", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawFees",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MoonUpContractFactory__TokensCreated",
    "inputs": [
      {
        "name": "MoonUpTokenPair",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "MoonUpErc20",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ]
  }
] as const;

  export default {abi: contractABI , address: "0x12F12BdB5AE6C3F7386B0a214DFF30881DDab391" as `0x${string}`}