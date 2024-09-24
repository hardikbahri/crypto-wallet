import React from 'react';
import { Container, Row, Col, Card, Alert, Navbar, Nav, Button, Table} from 'react-bootstrap';
import ImportWallet from './ImportWallet';
import ListWalletScreen from './ListWalletScreen';
import TransactionsScreen from './TransactionsScreen';
import useDashboard from '../hooks/useDashboard'; // Import the hook
import '../styles/global.css'
import Sidebar from './SideBar';

import { ReactComponent as PlusIcon } from '../icons/PlusIcon.svg'; // Adjust your SVG import
//import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  const {
    wallets,//contain Wallet[] (name,address)
    balanceDetails,
    historyDetails,
    handleImport,
    handleNavClick,
    activeSection,
    handleBalanceUpdate,
    handleHistoryUpdate,
  } = useDashboard();
  {console.log("bd is",balanceDetails)}
  return (
    <Container fluid className='bg-color' style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="text-left">
        <img src='./logo.svg' alt="Logo" style={{ width: '30px', marginTop: '10px' }} /> {/* Adjust size as needed */}
        <Navbar.Brand className="text-light font-weight-bold">cySync</Navbar.Brand>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} />
      </div>
     
      <Row>


        <Col
          md={2}
          className="bg-dark text-light d-flex flex-column justify-content-between"
          style={{ height: '600px' }}
        >
          <div>
            {/* Branding */}

            {/* Navigation */}
            <Nav className="flex-column p-3">
              <Nav.Link href="#" className={activeSection ==='wallets'?'text-warning':'text-light'} onClick={() => handleNavClick('wallets')}>
                <img src={'/wallet.svg'} alt="Wallet Icon" />
                <i className="bi bi-wallet2"></i> Wallets
              </Nav.Link>
              <br />
              <Nav.Link href="#"className={activeSection ==='transactions'?'text-warning':'text-light'} onClick={() => handleNavClick('transactions')}>
                <img src={'/transaction.svg'} alt="Transaction Icon" />
                <i className="bi bi-arrow-left-right"></i> Last Transactions
              </Nav.Link>
            </Nav>
          </div>

          {/* Support Button */}
          <Button
            style={{ backgroundColor: '#7A5B29', color: 'white' }}
            className="border-0 p-2 m-3"
          >
            Support
          </Button>
        </Col>


        {/* Main Content */}
        <Col md={10} className="bg-color text-light p-4">
          {/* Header with Sync Info */}




          {/* Conditionally Render Based on Active Section */}
          {activeSection === 'wallets' && (
            <>
          <div
            className="d-flex justify-content-between align-items-center mb-3">
           <br/>
            <ImportWallet onImport={handleImport} />
          </div>
              <h5>Total Coins - 0</h5>
                  <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} />
             <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th >Holding</th>
                    <th >Actions</th>
                  </tr>
                </thead>
                
                <tbody>
                  {/* Empty table row */}
                

                </tbody>
                </Table>
              {wallets.length > 0 ? (
                <ListWalletScreen wallets={wallets.map(({name, address }) => ({ name,address, balance: 0 }))} />
              ) : (
                <Alert variant="info">No wallets imported yet.</Alert>
              )}
            </>
          )}

          {activeSection === 'transactions' && (
            <>
              <h5>Total Coins - 0</h5>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                  <th>Coin</th>
                    <th>Wallet</th>
                    <th>Amount</th>
                    <th>Result</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <TransactionsScreen wallets={wallets.map(({ name,address }) => ({ name,address, balance: 0 }))} />
                </tbody>
              </Table>
            </>
          )}


        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
