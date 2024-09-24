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
    if (wallets.length > 0) {
      // Automatically trigger sync when wallets change or on mount
      addSyncItemsToQueue(wallets);
    }
  }, [wallets]);

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
            return {
              ...wallet,
              ...(balance !== undefined && { balance }), // Update balance if provided
              ...(history !== undefined && { transactions: history }) // Update history if provided
            };
          }
          return wallet;
        });
      } else {
        // Create a new wallet entry ensuring all properties are provided
        const newWalletDetails: WalletDetails = {
          address,
          name: "Default Name", // You may need to set a proper name based on your data structure
          balance: balance ?? 0, // Default to 0 if not provided
          transactions: history ?? [] // Default to an empty array if not provided
        };
        return [...prevDetails, newWalletDetails];
      }
    });
  };
  const handleSyncButtonClick = () => {
    addSyncItemsToQueue(wallets); // Add all wallets to queue
  };

  return { syncStatus, handleSyncButtonClick };
};

export default useSyncQueue;
