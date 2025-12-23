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

  // src/App.tsx
  return (
    <div className="container">
      <header className="main-header">
        <div className="brand">
          <h1 className="logo-text">Weblet</h1>
          <span className="badge"></span>
        </div>
        <select className="network-select" value={network} onChange={(e) => setNetwork(e.target.value)}>
          <option value={NETWORKS.DEVNET}>Devnet</option>
          <option value={NETWORKS.TESTNET}>Testnet</option>
        </select>
      </header>

      {!keypair ? (
        /* --- LANDING / ONBOARDING VIEW --- */
        <div className="onboarding-view">
          <div className="hero-content">
            <h1>Manage Solana Assets <br /> with Confidence.</h1>
            <p>Create a secure, non-custodial wallet in seconds to start sending and receiving SPL tokens on the Solana network.</p>
          </div>

          <div className="onboarding-card-wrapper">
            <WalletCreate
              onCreate={createWallet}
              onImport={loadWalletFromSecret}
              keypair={keypair}
            />
          </div>
        </div>
      ) : (
        /* --- FULL DASHBOARD VIEW --- */
        <div className="dashboard-view">
          <WalletInfo keypair={keypair} network={network} />

          <div className="dashboard-grid">
            {/* LEFT COLUMN: Stacked cards */}
            <div className="column-stack">
              <ReceiveToken publicKey={publicKey} />
              <WalletCreate
                onCreate={createWallet}
                onImport={loadWalletFromSecret}
                keypair={keypair}
              />
            </div>

            {/* RIGHT COLUMN: Send card */}
            <div className="column-stack">
              <SendToken keypair={keypair} network={network} />
            </div>
          </div>

          {/* Logout link at the bottom */}
          <div className="footer-actions">
            <button className="disconnect-link" onClick={() => window.location.reload()}>
              Logout & Clear Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;