import { useState } from 'react';
import { Wallet, BalanceDetails, HistoryDetails } from '../interfaces/interfaces';

const useDashboard = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [balanceDetails, setBalanceDetails] = useState<BalanceDetails[]>([]);
  const [historyDetails, setHistoryDetails] = useState<HistoryDetails | null>(null);
   const [activeSection, setActiveSection] = useState<string>('wallets'); 

  const handleNavClick = (section: string) => {
    setActiveSection(section); 
  };

  const handleImport = (name: string, address: string) => {
    setWallets((prev) => [...prev, { name, address }]);
  };

  const handleBalanceUpdate = (details: BalanceDetails[]) => {
    setBalanceDetails(details);
  };

  const handleHistoryUpdate = (history: HistoryDetails) => {
    setHistoryDetails(history);
  };

  return {
    wallets,
    balanceDetails,
    historyDetails,
    activeSection,
    handleImport,
    handleBalanceUpdate,
    handleHistoryUpdate,
    handleNavClick,
  };
};

export default useDashboard;
