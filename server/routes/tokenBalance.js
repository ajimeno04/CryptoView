const express = require('express');
const { getTokenBalance } = require('../controllers/tokenBalanceController');
const router = express.Router();

/**
 * @swagger
 * /api/token-balance/{walletAddress}/{tokenContractAddress}:
 *   get:
 *     summary: Retrieve and save token balance
 *     tags:
 *       - Token Balance
 *     description: Fetch the balance of a specified token for a given wallet address and save it in the database.
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address to fetch the token balance for.
 *         example: "0x1234...abcd"
 *       - in: path
 *         name: tokenContractAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract address of the token.
 *         example: "0xabcd...1234"
 *     responses:
 *       200:
 *         description: Token balance successfully retrieved and stored.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *                 tokenContractAddress:
 *                   type: string
 *                 balance:
 *                   type: number
 *       400:
 *         description: Invalid input.
 *       404:
 *        description: No token balance found for the specified wallet and contract address.
 *       500:
 *         description: Internal server error.
 */
router.get('/:walletAddress/:tokenContractAddress', getTokenBalance);

module.exports = router;
