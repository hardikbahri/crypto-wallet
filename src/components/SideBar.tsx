import React from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import useDashboard from '../hooks/useDashboard'; 

const Sidebar: React.FC = () => {
  const { activeSection, handleNavClick } = useDashboard();

  return (
    <Col
      md={2}
      className="bg-dark text-light d-flex flex-column justify-content-between"
      style={{ height: '550px', marginTop: '6%', marginBottom: '2%' }}
    >
      <div>
        
        <Nav className="flex-column p-3">
          {/* Wallets Nav Link */}
          <Nav.Link
            href="#"
            className={activeSection === 'wallets' ? 'text-warning' : 'text-light'}
            onClick={() => handleNavClick('wallets')}
          >
            <img src={'/wallet.svg'} alt="Wallet Icon" style={{ marginRight: '10px' }} />
            <i className="bi bi-wallet2"></i> Wallets
          </Nav.Link>
          <br />

          {/* Transactions Nav Link */}
          <Nav.Link
            href="#"
            className={activeSection === 'transactions' ? 'text-warning' : 'text-light'}
            onClick={() => handleNavClick('transactions')}
          >
            <img src={'/transaction.svg'} alt="Transaction Icon" style={{ marginRight: '10px' }} />
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
  );
};

export default Sidebar;
