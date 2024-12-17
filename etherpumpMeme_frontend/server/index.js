import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import tokenRoutes from './routes/tokenRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import { watchTokenEvents, getHistoricalEvents } from './services/blockchain.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/tokens', tokenRoutes);
app.use('/api/transactions', transactionRoutes);

// Start blockchain event listener
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
if (CONTRACT_ADDRESS) {
  // Process historical events first
  getHistoricalEvents(CONTRACT_ADDRESS, BigInt(0))
    .then(() => {
      // Then start watching for new events
      return watchTokenEvents(CONTRACT_ADDRESS);
    })
    .then(() => logger.info('Started watching blockchain events'))
    .catch((error) => logger.error('Failed to start watching events:', error));
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});