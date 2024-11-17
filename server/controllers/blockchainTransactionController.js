const axios = require('axios');
const BlockchainTransaction = require('../models/blockchainTransactionModel');
require('dotenv').config();

/**
 * Fetches the last 5 transactions for a given address on Polygon and stores them in MongoDB.
 */
const fetchPolygonTransactions = async (req, res) => {
  const { address } = req.params;

  // Validate input
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address format. Please provide a valid cryptocurrency address.' });
  }

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
      return res.status(404).json({ error: 'No transactions found or address not found.' });
    }

    const transactions = response.data.result;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions available for the specified address.' });
    }

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

    if (error.response) {
      // If the error comes from the API
      return res.status(500).json({
        error: 'Failed to fetch transactions from Polygonscan API. Please try again later.',
      });
    }

    // Handle other server errors
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

module.exports = { fetchPolygonTransactions };
