import Token from '../models/Token.js';
import logger from '../utils/logger.js';

export const createToken = async (req, res) => {
  try {
    const { curveAddr, tokenAddr, photoUrl } = req.body;
    
    const token = await Token.create({
      curveAddr,
      tokenAddr,
      photoUrl,
    });

    res.status(201).json(token);
  } catch (error) {
    logger.error('Error creating token:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getTokens = async (req, res) => {
  try {
    const tokens = await Token.find().sort({ createdAt: -1 });
    res.json(tokens);
  } catch (error) {
    logger.error('Error fetching tokens:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getTokenByAddress = async (req, res) => {
  try {
    const token = await Token.findOne({ 
      $or: [
        { curveAddr: req.params.address },
        { tokenAddr: req.params.address }
      ]
    });
    
    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }
    
    res.json(token);
  } catch (error) {
    logger.error('Error fetching token:', error);
    res.status(500).json({ message: error.message });
  }
};