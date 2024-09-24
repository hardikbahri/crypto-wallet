// interfaces/interfaces.ts

export interface Transaction {
  amount:number,//transac amt
      
      total: number,//no of transactions
      date:string//date recvd 
}
export interface BalanceDetails {
  name:string;
  address: string;
  balance: number;
}

export interface HistoryDetails {
  address: string;
  transactions: Transaction[];
}

export interface WalletDetails {
  name: string;
  address:string;
  balance: number;
  transactions: Transaction[];
}

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
