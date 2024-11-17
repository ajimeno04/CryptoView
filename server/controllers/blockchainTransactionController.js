const axios = require('axios');
const BlockchainTransaction = require('../models/blockchainTransactionModel');
require('dotenv').config();

/**
 * Fetches the last 5 transactions for a given address on Polygon and stores them in MongoDB.
 */
const fetchPolygonTransactions = async (req, res) => {
  const { address } = req.params;

  try {
    // Call Polygonscan API
    const response = await axios.get(`https://api.polygonscan.com/api`, {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 5,
        sort: 'desc',
        apikey: process.env.POLYGONSCAN_API_KEY,
      },
    });
    // Handle API errors
    if (response.data.status !== '1') {
      return res.status(400).json({ error: response.data.message });
    }

    const transactions = response.data.result;
    console.log(transactions);
    // Save transactions to MongoDB
    for (const tx of transactions) {
      await BlockchainTransaction.create({
        address: tx.to,
        hash: tx.hash,
        blockNumber: tx.blockNumber,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: new Date(tx.timeStamp * 1000),
      });
    }

    res.status(200).json({ message: 'Transactions saved successfully', transactions });
  } catch (error) {
    console.error('Error fetching Polygon transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = { fetchPolygonTransactions };
