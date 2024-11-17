const Web3 = require('web3').default;
const NFT = require("../models/nftModel");
const nftAbi = require("../abis/nftAbi.json");
require("dotenv").config();

const web3 = new Web3(process.env.RPC_URL); // Initialize Web3 with RPC URL

/**
 * Fetches metadata for a specific NFT using its contract address and token ID.
 * - Retrieves the `tokenURI` from the blockchain.
 * - Fetches the metadata JSON from the `tokenURI`.
 * - Returns the metadata in the response.
 */
const fetchNFTMetadata = async (req, res) => {
  const { contractAddress, tokenId } = req.params;

  // Validate inputs
  if (!web3.utils.isAddress(contractAddress)) {
    return res.status(400).json({ error: "Invalid contract address format" });
  }
  if (!/^\d+$/.test(tokenId)) {
    return res.status(400).json({ error: "Invalid token ID format. It must be a numeric string." });
  }

  try {
    // Initialize the contract instance
    const contract = new web3.eth.Contract(nftAbi, contractAddress);

    let tokenURI;
    try {
      // Retrieve the tokenURI for the NFT
      tokenURI = await contract.methods.tokenURI(tokenId).call();
    } catch (err) {
      console.error("Error fetching tokenURI from the contract:", err);
      return res.status(404).json({ error: "Token not found or invalid contract interaction" });
    }

    let metadata;
    try {
      // Fetch metadata JSON from the tokenURI
      const metadataResponse = await fetch(tokenURI);
      if (!metadataResponse.ok) {
        throw new Error(`Failed to fetch metadata from ${tokenURI}`);
      }
      metadata = await metadataResponse.json();
    } catch (err) {
      console.error("Error fetching or parsing metadata:", err);
      return res.status(500).json({ error: "Failed to retrieve or parse NFT metadata" });
    }

    // Save metadata to MongoDB
    const nft = await NFT.create({
      contractAddress,
      tokenId,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
    });

    // Respond with the stored metadata
    res.status(200).json(nft);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "An unexpected error occurred while processing the request" });
  }
};

module.exports = { fetchNFTMetadata };
