import { useWallet } from './hooks/UseWallets';
import { WalletCreate } from './components/WalletCreate';
import { WalletInfo } from './components/WalletInfo';
import { ReceiveToken } from './components/ReceiveToken';
import { SendToken } from './components/SendToken';
import { NETWORKS } from './utils/Constants';
import './App.css';

function App() {
  const { 
    keypair, 
    publicKey, 
    createWallet, 
    loadWalletFromSecret, 
    network, 
    setNetwork,
    error 
  } = useWallet();

  return (
    <div className="container">
      <header>
        <h1>Solana SPL Manager</h1>
        <select 
          value={network} 
          onChange={(e) => setNetwork(e.target.value)}
        >
          <option value={NETWORKS.DEVNET}>Devnet</option>
          <option value={NETWORKS.TESTNET}>Testnet</option>
        </select>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <WalletInfo keypair={keypair} network={network} />

      <main className="grid">
        <WalletCreate 
          onCreate={createWallet} 
          onImport={loadWalletFromSecret} 
          keypair={keypair} 
        />
        <ReceiveToken publicKey={publicKey} />
        <SendToken keypair={keypair} network={network} />
      </main>
    </div>
  );
}

export default App;