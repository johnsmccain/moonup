import Token from '../models/Token.js';
import logger from '../utils/logger.js';

export const createToken = async (req, res) => {
  try {
    const curveAddr = req.body.curveAddr;
    console.log(curveAddr);
    console.log(req.body);
    // cloudinary.uploader.upload('').then(result => {
    //     console.log(result);
    //   })
    // Check if the curve already exists in the database
    const existingCurve = await Token.findOne({ curveAddr: curveAddr });

    if (existingCurve) {
        res.status(400).send({ message: "Curve already exists" });
        return;
    }

    // If not, create the curve (replace this with your actual creation logic)
    const newCurve = new Token({
        curveAddr: curveAddr,
        ...req.body, // Include additional data for the curve if needed
    });

    await newCurve.save();

    res.status(200).send({ message: "Curve created successfully", curve: newCurve });
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