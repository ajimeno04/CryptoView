const mongoose = require("mongoose");

// Define the schema for storing NFT metadata
const nftSchema = new mongoose.Schema(
  {
    contractAddress: { type: String, required: true }, 
    tokenId: { type: String, required: true }, 
    name: { type: String }, 
    description: { type: String }, 
    image: { type: String },
  },
);

module.exports = mongoose.model("NFT", nftSchema); // Export the model
