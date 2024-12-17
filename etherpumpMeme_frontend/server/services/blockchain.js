import { createPublicClient, http, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains';
import logger from '../utils/logger.js';
import { handleBuyEvent, handleSellEvent } from './eventHandlers.js';

const EVENTS = {
  BUY: parseAbiItem('event Buy(address indexed buyer, uint256 ethAmount, uint256 tokenAmount)'),
  SELL: parseAbiItem('event Sell(address indexed seller, uint256 ethAmount, uint256 tokenAmount)')
};

export const createBlockchainClient = () => {
  return createPublicClient({
    chain: sepolia,
    transport: http(process.env.SEPOLIA_RPC_URL)
  });
};

export const watchTokenEvents = async (contractAddress) => {
  const client = createBlockchainClient();

  try {
    // Watch Buy events
    const unwatchBuy = client.watchContractEvent({
      address: contractAddress,
      event: EVENTS.BUY,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            await handleBuyEvent(log);
          } catch (error) {
            logger.error('Error handling buy event:', error);
          }
        }
      }
    });

    // Watch Sell events
    const unwatchSell = client.watchContractEvent({
      address: contractAddress,
      event: EVENTS.SELL,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            await handleSellEvent(log);
          } catch (error) {
            logger.error('Error handling sell event:', error);
          }
        }
      }
    });

    // Return cleanup function
    return () => {
      unwatchBuy();
      unwatchSell();
    };
  } catch (error) {
    logger.error('Error setting up event watchers:', error);
    throw error;
  }
};

export const getHistoricalEvents = async (contractAddress, fromBlock) => {
  const client = createBlockchainClient();

  try {
    // Get historical buy events
    const buyLogs = await client.getLogs({
      address: contractAddress,
      event: EVENTS.BUY,
      fromBlock
    });

    // Get historical sell events
    const sellLogs = await client.getLogs({
      address: contractAddress,
      event: EVENTS.SELL,
      fromBlock
    });

    // Process historical events
    for (const log of buyLogs) {
      await handleBuyEvent(log);
    }

    for (const log of sellLogs) {
      await handleSellEvent(log);
    }

    logger.info('Historical events processed', {
      buyEvents: buyLogs.length,
      sellEvents: sellLogs.length
    });
  } catch (error) {
    logger.error('Error processing historical events:', error);
    throw error;
  }
};