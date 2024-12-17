import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  address: {type: String},
  curveAddr: {type: String},
  creator: {type: String},
  createdBlock: {type: String},
  name: {type: String},
  description: {type: String},
  totalSupply: {type: Number},
  image: {type: String},
  symbol: {type: String},
  website: {type: String},
  telegram: {type: String},
  twitter: {type: String},
  replies: {type: [String]},
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;