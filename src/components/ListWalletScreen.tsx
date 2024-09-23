// src/components/ListWalletScreen.tsx
import React from 'react';
import { Card, ListGroup, Spinner, Alert, Button, Container } from 'react-bootstrap';
import useWalletDetails from '../hooks/useWalletDetails';
import { BalanceDetails } from '../interfaces/interfaces';

const ListWalletScreen: React.FC<{ wallets: BalanceDetails[] }> = ({ wallets }) => {
  const { walletDetails, loading, error } = useWalletDetails(wallets);

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {walletDetails.map((wallet, index) => ( // Corrected to use walletDetails directly
        <Container className="mt-3" key={index}>
          <Card className="bg-dark text-light">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  key={wallet.balance} // Unique key for each wallet
                  className="d-flex justify-content-between align-items-center bg-dark text-light rounded mb-2 border-0"
                  style={{ height: '60px' }} // Adjust the height to match the rectangular bars in the image
                >
                  <div className="d-flex align-items-center">
                    <img
                      src="/icon.svg"
                      style={{ width: '32px', height: '32px', marginRight: '15px' }}
                      alt="coin"
                    />
                    <span>{wallet.balance}</span>
                  </div>
                  <span>{wallet.balance}</span>
                  <Button className="btn btn-link" size="sm">
                  <img
                      src="/trash.svg"
                    
                      alt="coin"
                    />
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
