const express = require('express');
const { fetchPolygonTransactions } = require('../controllers/blockchainTransactionController');

const router = express.Router();

/**
 * @swagger
 * /api/blockchain-transaction/{address}:
 *   get:
 *     summary: Fetch the last 5 transactions for an address
 *     tags:
 *       - Retrieve Blockchain Transaction
 *     description: Retrieve the last 5 transactions for a cryptocurrency address and store them in MongoDB.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency address to fetch transactions for.
 *         example: "0x1234...abcd"
 *     responses:
 *       200:
 *         description: A list of the last 5 transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hash:
 *                     type: string
 *                     description: Transaction hash.
 *                   from:
 *                     type: string
 *                     description: Sender address.
 *                   to:
 *                     type: string
 *                     description: Receiver address.
 *                   value:
 *                     type: string
 *                     description: Value transferred in the transaction.
 *                   timeStamp:
 *                     type: string
 *                     description: Timestamp of the transaction.
 *       400:
 *         description: Invalid input. Address must be a valid cryptocurrency address.
 *       404:
 *         description: Address not found or no transactions available.
 *       500:
 *         description: Server error. Unable to process the request.
 */
router.get('/:address', fetchPolygonTransactions);

module.exports = router;
