import axios from 'axios';
import { Transaction} from '../interfaces/interfaces';
const API_KEY = process.env.REACT_APP_BLOCKCYPHER_API_KEY;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3';


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
      amount:tx.total,//transac amt
      
      total: txs.length,//no of transactions
      date:tx.received//date recvd 
    }));

    return { address, balance, transactions };
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    throw new Error('Failed to fetch wallet details');
  }
};
