const mongoose = require('mongoose');

const blockchainTransactionSchema = new mongoose.Schema({
  address: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  blockNumber: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('BlockchainTransaction', blockchainTransactionSchema);
