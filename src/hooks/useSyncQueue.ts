// src/hooks/useSyncQueue.ts
import { useEffect, useState } from 'react';
import { getWalletDetails } from '../api/fetchWalletDetails';
import { Wallet, SyncItem, WalletDetails, Transaction } from '../interfaces/interfaces';

const useSyncQueue = (wallets: Wallet[], onWalletDetailsUpdate: (details: WalletDetails[]) => void) => {
  const [queue, setQueue] = useState<SyncItem[]>([]);
  const [syncStatus, setSyncStatus] = useState<'Synced' | 'Syncing'>('Synced');
  const [walletDetails, setWalletDetails] = useState<WalletDetails[]>([]);
  const [walletDetailsState, setWalletDetailsState] = useState<WalletDetails[]>([]);

  useEffect(() => {
    if (queue.length > 0) {
      processQueue(); // Start processing the queue when it changes
    }
  }, [queue]);

  useEffect(() => {
    if (walletDetails.length > 0 && walletDetails !== walletDetailsState) {
      setWalletDetailsState(walletDetails);
      onWalletDetailsUpdate([...walletDetails]); // Pass a new array to avoid stale updates
    }
  }, [walletDetails, onWalletDetailsUpdate]);

  const addSyncItemsToQueue = (wallets: Wallet[]) => {
    const syncItems: SyncItem[] = wallets.flatMap(wallet => [
      { type: 'balance', wallet, balance: 0 },
      { type: 'history', wallet, history: [] }
    ]);
    setQueue(syncItems);
  };

  const processQueue = async () => {
    setSyncStatus('Syncing');
    for (const syncItem of queue) {
      try {
        await syncWalletData(syncItem);
        await new Promise(resolve => setTimeout(resolve, 200)); // 0.2s delay between each item
      } catch (error) {
        console.error('Error syncing wallet data:', error);
      }
    }
    setSyncStatus('Synced');
  };

  const syncWalletData = async (syncItem: SyncItem) => {
    const { type, wallet } = syncItem;
    const details = await getWalletDetails(wallet.address);

    if (type === 'balance') {
      updateWalletDetails(wallet.address, details.balance, undefined);
    } else if (type === 'history') {
      updateWalletDetails(wallet.address, undefined, details.transactions);
    }
    setQueue([]);
  };

  const updateWalletDetails = (
    address: string,
    balance?: number,
    history?: Transaction[]
  ) => {
    setWalletDetails(prevDetails => {
      const existing = prevDetails.find(wallet => wallet.address === address);

      if (existing) {
        return prevDetails.map(wallet => {
          if (wallet.address === address) {
            if ('balance' in wallet && balance !== undefined) {
              return { ...wallet, balance }; // Update balance
            }
            if ('transactions' in wallet && history !== undefined) {
              return { ...wallet, transactions: history }; // Update history
            }
          }
          return wallet;
        });
      } else {
        return [
          ...prevDetails,
          balance !== undefined
            ? { address, balance } // Add as BalanceDetails
            : { address, transactions: history ?? [] } // Add as HistoryDetails
        ];
      }
    });
  };

  const handleSyncButtonClick = () => {
    addSyncItemsToQueue(wallets); // Add all wallets to queue
  };

  return { syncStatus, handleSyncButtonClick };
};

export default useSyncQueue;
