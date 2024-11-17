const Web3 = require('web3').default;
require('dotenv').config();
const tokenABI = require("../abis/tokenAbi.json");

// Initialize Web3 with the RPC URL for Polygon
const web3 = new Web3(process.env.RPC_URL);

/**
 * Fetches the token balance for a specific wallet and token contract and returns it.
 */
const getTokenBalance = async (req, res) => {
  const { walletAddress, tokenContractAddress } = req.params;

  // Validate inputs
  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address format. Please provide a valid cryptocurrency address.' });
  }
  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(tokenContractAddress)) {
    return res.status(400).json({ error: 'Invalid address format. Please provide a valid cryptocurrency address.' });
  }

  try {
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Query the token balance
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();

    // Check if the balance is null or zero
    if (balance === null || balance === '0') {
      return res.status(404).json({
        error: 'No token balance found for the specified wallet and contract address',
      });
    }

    // Convert the balance to a readable format (divide by 10^18 for ERC-20 tokens)
    const formattedBalance = web3.utils.fromWei(balance, 'ether');

    // Respond with the token balance
    res.status(200).json({
      walletAddress,
      tokenContractAddress,
      balance: formattedBalance,
    });
  } catch (error) {
    console.error('Error fetching token balance:', error);

    // Handle contract-related errors
    if (error.message.includes('invalid address') || error.message.includes('execution reverted')) {
      return res.status(400).json({ error: 'Invalid token contract or wallet address' });
    }

    // Handle other errors as internal server errors
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTokenBalance };
