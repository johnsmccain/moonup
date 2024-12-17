import Transaction from '../models/Transaction.js';
import logger from '../utils/logger.js';

export const getTransactions = async (req, res) => {
  try {
    const { type, address, limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by transaction type
    if (type) {
      query.type = type;
    }

    // Filter by address (buyer or seller)
    if (address) {
      query.$or = [
        { buyer: address },
        { seller: address }
      ];
    }

    const transactions = await Transaction.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching transactions:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalEthVolume: {
            $sum: { $toDouble: '$ethAmount' }
          },
          totalTokenVolume: {
            $sum: { $toDouble: '$tokenAmount' }
          }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    logger.error('Error fetching transaction stats:', error);
    res.status(500).json({ message: error.message });
  }
};