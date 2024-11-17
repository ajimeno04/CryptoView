const Web3 = require('web3').default;
require('dotenv').config();

// Initialize Web3 with the RPC URL for Polygon
const web3 = new Web3(process.env.RPC_URL);

/**
 * Fetches the token balance for a specific wallet and token contract and returns it.
 */
const getTokenBalance = async (req, res) => {
  const { walletAddress, tokenContractAddress } = req.params; 
  console.log(walletAddress);
  try {
    // ABI for the `balanceOf` method of an ERC-20 token
    const tokenABI = [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
    ];
    console.log(tokenContractAddress);
    // Create a contract instance for the token
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Query the token balance
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    console.log(balance);
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
    res.status(500).json({ error: 'Failed to fetch token balance' });
  }
};

module.exports = { getTokenBalance };
