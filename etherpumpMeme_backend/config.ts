export const frontendUrl = process.env.NODE_ENV === "development" || !process.env.FRONTEND_URL ? "localhost:5173" : process.env.FRONTEND_URL;

export const ONE_ETH = BigInt(Math.pow(10, 18));