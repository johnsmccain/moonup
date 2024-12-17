import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  buyer: {
    type: String,
    required: function() { return this.type === 'buy'; }
  },
  seller: {
    type: String,
    required: function() { return this.type === 'sell'; }
  },
  ethAmount: {
    type: String,
    required: true
  },
  tokenAmount: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  blockNumber: {
    type: Number,
    required: true
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;