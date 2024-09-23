// src/components/ImportWallet.tsx
import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import useImportWallet from '../hooks/useImportWallet';
import '../styles/global.css'
import { ReactComponent as PlusIcon } from '../icons/PlusIcon.svg'; // Adjust the path as needed

interface ImportWalletProps {
  onImport: (name: string, address: string) => void;
}

const ImportWallet: React.FC<ImportWalletProps> = ({ onImport }) => {
  const {
    walletName,
    setWalletName,
    mnemonic,
    setMnemonic,
    error,
    showModal,
    setShowModal,
    handleImport,
    handleClose,
  } = useImportWallet(onImport);

  return (
    <>
     <div className="position-fixed top-0 end-0 m-4" >
      <br/>
      <br/>
      <br/>
    <Button
      className="d-flex align-items-center justify-content-center btn-custom transparent-btn mt-5" // Add your custom class here
      variant="primary"
      
      onClick={() => {
        handleImport(); // Call the existing import logic
        setShowModal(true); // Show the modal
      }}
    >
  <img 
    src={'/ellipse.svg'} 
    alt='transaction' 
    style={{ width: '16px', height: '16px', marginRight: '8px' }} // Adjusted size and margin
  />
      <span style={{ fontSize: '12px' }}>IMPORT WALLET</span>
    </Button>
  </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="walletName">
              <Form.Label>Wallet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wallet name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="mnemonic">
              <Form.Label>Mnemonic Phrase</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your mnemonic phrase"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleImport}>
            Import Wallet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportWallet;
