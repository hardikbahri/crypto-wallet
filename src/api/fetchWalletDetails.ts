
import axios from 'axios';
import { Transaction } from '../interfaces/interfaces';
import { error } from 'console';

const API_KEY = process.env.REACT_APP_BLOCKCYPHER_API_KEY;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3';
interface WalletDetails {
  address: string;
  balance: number;
  transactions: Transaction[];
}

// Mock data for testing used because blockcypher api rate limiting
const mockWalletDetails: WalletDetails = {
  address: 'tb1qjf5dnshkwzmr0j54z4zg46m3585m30pr2g8up4',
  balance: 5564,
  transactions: [
    {
      amount: 611185,
      total: 3,
      date: '2024-01-05T09:10:58.083Z',
    },
    {
      amount: 1033128,
      total: 3,
      date: '2024-01-05T09:11:16.056Z',
    },
    {
      amount: 5496439,
      total: 3,
      date: '2024-01-05T06:41:55.09Z',
    },
  ],
};


export const getWalletDetails = async (address: string): Promise<WalletDetails> => {
  // if (process.env.NODE_ENV === 'development') {

  //   // Return mock data in development mode
  //   console.log(process.env.NODE_ENV,'Returning mock wallet details for testing.');
  //   return mockWalletDetails;
  // }

  try {
    console.log("calling api")
    const response = await axios.get(`${BASE_URL}/addrs/${address}/full?token=${API_KEY}`);
    const { balance, txs } = response.data;

    const transactions = txs.map((tx: any) => ({
      amount: tx.total, // transaction amount
      total: txs.length, // number of transactions
      date: tx.received, // date received
    }));

    return { address, balance, transactions };
  }
  catch (err: any) {
    // Check if it's an Axios error
    if (axios.isAxiosError(err)) {
      console.error("API call failed:", err.response?.data || err.message);
    } else {
      console.error("Unexpected error:", err);
    }
}
return {
  address,
  balance: 0,
  transactions: [],
};

};
