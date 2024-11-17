const express = require('express');
const { fetchPolygonTransactions } = require('../controllers/blockchainTransactionController');

const router = express.Router();
/**
 * @swagger
 * /api/blockchain-transaction/{address}:
 *   get:
 *     summary: Fetch the last 5 transactions for an address
 *     description: Retrieve the last 5 transactions for a cryptocurrency address and store them in MongoDB.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency address to fetch transactions for
 *     responses:
 *       200:
 *         description: A list of the last 5 transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hash:
 *                     type: string
 *                     description: Transaction hash
 *                   from:
 *                     type: string
 *                     description: Sender address
 *                   to:
 *                     type: string
 *                     description: Receiver address
 *                   value:
 *                     type: string
 *                     description: Value transferred in the transaction
 *                   timeStamp:
 *                     type: string
 *                     description: Timestamp of the transaction
 *       404:
 *         description: Address not found or no transactions available
 *       500:
 *         description: Server error
 */
router.get('/:address', fetchPolygonTransactions);

// 404 Error Handler
router.use((req, res) => {
    res.status(404).json({
      error: 'Address not found.',
    });
  });
module.exports = router;
