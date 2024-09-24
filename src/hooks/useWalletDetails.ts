// src/hooks/useWalletDetails.ts
import { useEffect, useState } from 'react';
import { getWalletDetails } from '../api/fetchWalletDetails';
import { BalanceDetails,Transaction } from '../interfaces/interfaces';
import SyncQueue from '../components/SyncQueue';
interface WalletDetails {
  name: string;
  address:string;
  balance: number;
  transactions: Transaction[];
}
const useWalletDetails = (wallets: {name:string,address: string }[]) => {
  const [walletDetails, setWalletDetails] = useState<WalletDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      setLoading(true);
      try {
        const fetchedDetails = await Promise.all(
          wallets.map(async (wallet) => {
            const details = await getWalletDetails(wallet.address);
          //   const details= {
          //     "address": "tb1qjf5dnshkwzmr0j54z4zg46m3585m30pr2g8up4",
          //     "balance": 5564,
          //     "transactions": [
          //         {
          //             "amount": 611185,
          //             "total": 3,
          //             "date": "2024-01-05T09:10:58.083Z"
          //         },
          //         {
          //             "amount": 1033128,
          //             "total": 3,
          //             "date": "2024-01-05T09:11:16.056Z"
          //         },
          //         {
          //             "amount": 5496439,
          //             "total": 3,
          //             "date": "2024-01-05T06:41:55.09Z"
          //         }
          //     ],
          //     "name": "test"
          // }
            console.log("details is",details)
            return { ...details ,name:wallet.name};
          })
        );
        setWalletDetails(fetchedDetails);
      } catch (err) {
        setError('Error fetching wallet data');
        console.error('Error fetching wallet data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [wallets]);

  return { walletDetails, loading, error };
};

export default useWalletDetails;
