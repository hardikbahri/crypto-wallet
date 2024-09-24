// src/components/ListWalletScreen.tsx
import React, { useState } from 'react';
import { Card, ListGroup, Spinner, Alert, Button, Container } from 'react-bootstrap';
import useWalletDetails from '../hooks/useWalletDetails';
import { BalanceDetails, WalletDetails } from '../interfaces/interfaces';
import SyncQueue from './SyncQueue'; // Import SyncQueue

const ListWalletScreen: React.FC<{ wallets: BalanceDetails[] }> = ({ wallets }) => {
  const { walletDetails, loading, error } = useWalletDetails(wallets);
  const [updatedWalletDetails, setUpdatedWalletDetails] = useState<WalletDetails[]>(walletDetails);

  const handleWalletDetailsUpdate = (details: WalletDetails[]) => {
    setUpdatedWalletDetails(details); // Update state with synced wallet details
  };

  console.log(updatedWalletDetails);

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {/* Sync Queue Component */}
      <SyncQueue wallets={wallets} onWalletDetailsUpdate={handleWalletDetailsUpdate} />
      
      {/* Wallet Details Display */}
      {updatedWalletDetails.map((wallet, index) => (
        <Container className="mt-3" key={index}>
          <Card className="bg-dark text-light">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  key={wallet.address} // Unique key for each wallet
                  className="d-flex justify-content-between align-items-center bg-dark text-light rounded mb-2 border-0"
                  style={{ height: '60px' }} // Adjust height as needed
                >
                  <div className="d-flex align-items-center">
                    <img
                      src="/icon.svg"
                      style={{ width: '32px', height: '32px', marginRight: '15px' }}
                      alt="coin"
                    />
                    <span>{wallet.name}</span> {/* Display address instead of name */}
                  </div>
                  <span>{wallet.balance}</span>
                  <Button className="btn btn-link" size="sm">
                    <img src="/trash.svg" alt="Delete" />
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      ))}
    </div>
  );
};

export default ListWalletScreen;
