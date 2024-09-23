// src/hooks/useWalletDetails.ts
import { useEffect, useState } from 'react';
import { getWalletDetails } from '../api/fetchWalletDetails';
import { BalanceDetails } from '../interfaces/interfaces';

const useWalletDetails = (wallets: { address: string }[]) => {
  const [walletDetails, setWalletDetails] = useState<BalanceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      setLoading(true);
      try {
        const fetchedDetails = await Promise.all(
          wallets.map(async (wallet) => {
            const details = await getWalletDetails(wallet.address);
            return { ...details };
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
