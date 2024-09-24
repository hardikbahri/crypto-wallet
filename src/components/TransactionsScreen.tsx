// src/components/TransactionsScreen.tsx
import React, { useState } from 'react';
import { Card, ListGroup, Spinner, Alert, Button, Container } from 'react-bootstrap';
import useWalletDetails from '../hooks/useWalletDetails';
import { BalanceDetails, WalletDetails } from '../interfaces/interfaces';
import SyncQueue from './SyncQueue'; // Import SyncQueue component

const TransactionsScreen: React.FC<{ wallets: BalanceDetails[] }> = ({ wallets }) => {
  const { walletDetails, loading, error } = useWalletDetails(wallets);
  const [updatedWalletDetails, setUpdatedWalletDetails] = useState<WalletDetails[]>(walletDetails);


  const handleWalletDetailsUpdate = (details: WalletDetails[]) => {
    setUpdatedWalletDetails(details); 
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      {/* Sync Queue Component */}
      <SyncQueue wallets={wallets} onWalletDetailsUpdate={handleWalletDetailsUpdate} />

      {/* Render updated wallet details and transactions */}
      {updatedWalletDetails.map((wallet, index) => (
        <Container className="mt-3" key={index}>
          {/* Transactions */}
          {wallet.transactions.map((transaction, transactionIndex) => (
            <Container className="mb-3" key={transactionIndex}>
              <Card className="bg-dark text-light">
                <Card.Body>
                  {wallet.transactions.length > 0 && (
                    <span>Total Transactions: {wallet.transactions[0].total}</span>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Left side: Wallet name and transaction info */}
                    <div className="d-flex align-items-center">
                      <img
                        src="/icon.svg"
                        style={{ width: '32px', height: '32px', marginRight: '15px' }}
                        alt="transaction"
                      />
                      <span>{wallet.name}</span> {/* Show wallet name */}
                      <span className="ms-3">Amount: {transaction.amount}</span>
                      <span className="ms-3">Date: {new Date(transaction.date).toLocaleString()}</span>
                    </div>
                   
                  </div>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </Container>
      ))}
    </>
  );
};

export default TransactionsScreen;
