import React from 'react';
import { Wallet } from '../interfaces/interfaces';
import useSyncQueue from '../hooks/useSyncQueue';
import { WalletDetails } from '../interfaces/interfaces';
interface SyncQueueProps {
  wallets: Wallet[];
  onWalletDetailsUpdate: (details: WalletDetails[]) => void;
}

const SyncQueue: React.FC<SyncQueueProps> = ({ wallets, onWalletDetailsUpdate }) => {
  const { syncStatus, handleSyncButtonClick } = useSyncQueue(wallets, onWalletDetailsUpdate);

  return (
    <div>
      <div>Status: {syncStatus}</div>
      <button onClick={handleSyncButtonClick} disabled={syncStatus === 'Syncing'}>
        Sync Wallet Data
      </button>
    </div>
  );
};

export default SyncQueue;
