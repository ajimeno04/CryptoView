const express = require("express");
const router = express.Router();
const { fetchNFTMetadata } = require("../controllers/nftController");

/**
 * @swagger
 * /api/nft/{contractAddress}/{tokenId}:
 *   get:
 *     summary: Retrieve metadata for a specific NFT
 *     tags:
 *       - NFT
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The contract address of the NFT
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The token ID of the NFT
 *     responses:
 *       200:
 *         description: Metadata retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the NFT metadata in the database
 *                 contractAddress:
 *                   type: string
 *                   description: The smart contract address of the NFT
 *                 tokenId:
 *                   type: string
 *                   description: The unique token ID of the NFT
 *                 name:
 *                   type: string
 *                   description: The name of the NFT
 *                 description:
 *                   type: string
 *                   description: A description of the NFT
 *                 image:
 *                   type: string
 *                   description: URL to the NFT image
 *       404:
 *         description: NFT not found
 *       500:
 *         description: Server error
 */
router.get("/:contractAddress/:tokenId", fetchNFTMetadata);
// 404 Error Handler
router.use((req, res) => {
    res.status(404).json({
      error: 'NFT not found',
    });
  });
module.exports = router;
