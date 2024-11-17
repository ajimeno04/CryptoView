const Web3 = require('web3').default;
const NFT = require("../models/nftModel");
const nftAbi = require("../abis/nftAbi.json");
require("dotenv").config();

const web3 = new Web3(process.env.RPC_URL); // Initialize Web3 with RPC URL

/**
 * Fetches metadata for a specific NFT using its contract address and token ID.
 * - Retrieves the `tokenURI` from the blockchain.
 * - Fetches the metadata JSON from the `tokenURI`.
 * - Stores the metadata in MongoDB and returns it in the response.
 */
const fetchNFTMetadata = async (req, res) => {
  const { contractAddress, tokenId } = req.params; // Extract parameters from the request

  try {
    const contract = new web3.eth.Contract(nftAbi, contractAddress); // Initialize contract instance
    const tokenURI = await contract.methods.tokenURI(tokenId).call(); // Get the tokenURI for the NFT

    const metadataResponse = await fetch(tokenURI); // Fetch metadata JSON from the URI

    const metadata = await metadataResponse.json(); // Parse metadata as JSON
    console.log(metadata);
    // Save metadata to MongoDB
    const nft = await NFT.create({
      contractAddress,
      tokenId,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
    });

    res.status(200).json(nft); // Respond with the stored metadata
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve NFT metadata" }); // Handle errors gracefully
  }
};

module.exports = { fetchNFTMetadata };
