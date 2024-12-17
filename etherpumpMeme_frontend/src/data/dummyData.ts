// Token data
export const tokens = [
  {
    id: '1',
    name: 'Pepe Classic',
    symbol: 'PEPE',
    price: 0.000001234,
    marketCap: 12500000,
    photoUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400',
    priceChange24h: 15.5,
  },
  {
    id: '2',
    name: 'Moon Doge',
    symbol: 'MDOGE',
    price: 0.000000789,
    marketCap: 8900000,
    photoUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
    priceChange24h: -5.2,
  },
  {
    id: '3',
    name: 'Rocket Shiba',
    symbol: 'RSHIB',
    price: 0.000002345,
    marketCap: 15600000,
    photoUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
    priceChange24h: 25.8,
  },
];

// Transaction data
export const transactions = [
  {
    id: '1',
    type: 'buy',
    amount: 1000000,
    price: 0.000001234,
    timestamp: '2024-03-15T10:30:00Z',
    address: '0x1234...5678',
  },
  {
    id: '2',
    type: 'sell',
    amount: 500000,
    price: 0.000001245,
    timestamp: '2024-03-15T10:35:00Z',
    address: '0x8765...4321',
  },
];

// Chat messages
export const messages = [
  {
    id: '1',
    text: 'To the moon! 🚀',
    sender: '0x1234...5678',
    timestamp: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    text: 'HODL strong! 💎🙌',
    sender: '0x8765...4321',
    timestamp: '2024-03-15T10:35:00Z',
  },
];

// Major holders
export const holders = [
  {
    address: '0x1234...5678',
    balance: 1000000,
    percentage: 10.5,
  },
  {
    address: '0x8765...4321',
    balance: 800000,
    percentage: 8.2,
  },
];

// Order book data
export const orderBook = {
  buyOrders: [
    { price: 0.000001234, amount: 1000000, total: 1.234 },
    { price: 0.000001233, amount: 2000000, total: 2.466 },
  ],
  sellOrders: [
    { price: 0.000001235, amount: 1500000, total: 1.8525 },
    { price: 0.000001236, amount: 1800000, total: 2.2248 },
  ],
};