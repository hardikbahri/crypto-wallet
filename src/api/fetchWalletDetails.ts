import axios from 'axios';

const API_KEY = process.env.REACT_APP_BLOCKCYPHER_API_KEY;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3';

interface Transaction {
  hash: string;
  block_height: number;
  total: number;
}

interface WalletDetails {
  address: string;
  balance: number;
  transactions: Transaction[];
}

// Updated to accept address as a parameter
export const getWalletDetails = async (address: string): Promise<WalletDetails> => {
  try {
    const response = await axios.get(`${BASE_URL}/addrs/${address}/full?token=${API_KEY}`);
    const { balance, txs } = response.data;

    const transactions = txs.map((tx: any) => ({
      hash: tx.hash,
      block_height: tx.block_height,
      total: tx.total,
    }));

    return { address, balance, transactions };
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    throw new Error('Failed to fetch wallet details');
  }
};
