import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  curveAddr: {
    type: String,
    required: true,
    unique: true,
  },
  tokenAddr: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;