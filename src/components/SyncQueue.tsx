// src/components/SyncQueue.tsx
import React from 'react';
import useSyncQueue from '../hooks/useSyncQueue';
import { Wallet, WalletDetails } from '../interfaces/interfaces';

const SyncQueue: React.FC<{ wallets: Wallet[], onWalletDetailsUpdate: (details: WalletDetails[]) => void }> = ({ wallets, onWalletDetailsUpdate }) => {
  const { syncStatus, handleSyncButtonClick } = useSyncQueue(wallets, onWalletDetailsUpdate);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ color: 'goldenrod', marginRight: '8px' }}>Sync Status: {syncStatus}</span>
      <button 
        onClick={handleSyncButtonClick} 
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Sync Now" 
      >
        <img src='/sync.svg' alt="Sync Icon" style={{ width: '24px', height: '24px', fill: 'goldenrod' }} />
      </button>
    </div>
  );
};

export default SyncQueue;
