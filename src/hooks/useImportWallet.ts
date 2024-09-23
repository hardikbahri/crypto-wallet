// src/hooks/useImportWallet.ts
import { useState } from 'react';
import axios from 'axios';

const useImportWallet = (onImport: (name: string, address: string) => void) => {
  const [walletName, setWalletName] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImport = async () => {
    if (!walletName.trim()) {
      setError('Please enter a wallet name');
      return;
    }

    if (!mnemonic.trim()) {
      setError('Please enter a mnemonic phrase');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/generate-addresses', {
        mnemonic: mnemonic.trim(),
      });

      const address = response.data.btcAddress;

      if (address && address.length > 0) {
        onImport(walletName, address);
        handleClose();
      } else {
        setError('No addresses generated');
      }
    } catch (err) {
      setError('Failed to import wallet addresses');
      console.error(err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setWalletName('');
    setMnemonic('');
    setError(null);
  };

  return {
    walletName,
    setWalletName,
    mnemonic,
    setMnemonic,
    error,
    showModal,
    setShowModal,
    handleImport,
    handleClose,
  };
};

export default useImportWallet;
