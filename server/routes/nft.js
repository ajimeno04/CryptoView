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
 *     description: Fetch the metadata for a given NFT specified by its contract address and token ID.
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The Ethereum or Polygon smart contract address of the NFT.
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique token ID of the NFT within the contract.
 *     responses:
 *       200:
 *         description: NFT metadata retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the NFT metadata in the database.
 *                 contractAddress:
 *                   type: string
 *                   description: The smart contract address of the NFT.
 *                 tokenId:
 *                   type: string
 *                   description: The unique token ID of the NFT.
 *                 name:
 *                   type: string
 *                   description: The name of the NFT.
 *                 description:
 *                   type: string
 *                   description: A description of the NFT.
 *                 image:
 *                   type: string
 *                   description: URL to the NFT image.
 *       400:
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message explaining the invalid input.
 *       404:
 *         description: NFT not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message indicating the NFT could not be found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating an issue with the server.
 */
router.get("/:contractAddress/:tokenId", fetchNFTMetadata);

module.exports = router;
