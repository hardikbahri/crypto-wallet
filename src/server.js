const express = require('express');
const cors = require('cors');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const bip32 = require("bip32");
const bitcoin = require('bitcoinjs-lib');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

app.use(express.json());

// Your existing routes here
router.post('/generate-addresses', (req, res) => {
    const network = bitcoin.networks.testnet;
    const path = `m/44'/0'/0'/0/0`;
    mnemonic=req.body.mnemonic;
    if (!bip39.validateMnemonic(mnemonic)) {
        return res.status(400).json({ error: 'Invalid mnemonic' });
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);
    const account = root.derivePath(path);
    const node = account.derive(0).derive(0);
    //const addresses = [];

    const btcAddress = bitcoin.payments.p2wpkh({
		pubkey: node.publicKey,
		network: network,
	}).address;
	console.log(btcAddress);
	

    res.json({ btcAddress });
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
