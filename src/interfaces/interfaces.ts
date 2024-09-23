// interfaces/interfaces.ts

export interface Transaction {
  hash: string;
  block_height: number;
  total: number;
}

export interface BalanceDetails {
  address: string;
  balance: number;
}

export interface HistoryDetails {
  address: string;
  transactions: Transaction[];
}

export type WalletDetails = BalanceDetails | HistoryDetails;

export interface Wallet {
  name: string;
  address: string;
}

export interface SyncItem {
  type: 'balance' | 'history';
  wallet: Wallet;
  balance?: number;
  history?: Transaction[];
}

export interface SyncQueueProps {
  wallets: Wallet[];
  onWalletDetailsUpdate: (details: WalletDetails[]) => void;
}
