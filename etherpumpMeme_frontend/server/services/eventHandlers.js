import Transaction from '../models/Transaction.js';
import logger from '../utils/logger.js';

export const handleBuyEvent = async (event) => {
  try {
    const { buyer, ethAmount, tokenAmount } = event.args;
    const { blockNumber, transactionHash } = event;

    await Transaction.create({
      type: 'buy',
      buyer,
      ethAmount: ethAmount.toString(),
      tokenAmount: tokenAmount.toString(),
      blockNumber,
      transactionHash
    });

    logger.info('Buy event processed', { buyer, transactionHash });
  } catch (error) {
    logger.error('Error processing buy event:', error);
    throw error;
  }
};

export const handleSellEvent = async (event) => {
  try {
    const { seller, ethAmount, tokenAmount } = event.args;
    const { blockNumber, transactionHash } = event;

    await Transaction.create({
      type: 'sell',
      seller,
      ethAmount: ethAmount.toString(),
      tokenAmount: tokenAmount.toString(),
      blockNumber,
      transactionHash
    });

    logger.info('Sell event processed', { seller, transactionHash });
  } catch (error) {
    logger.error('Error processing sell event:', error);
    throw error;
  }
};