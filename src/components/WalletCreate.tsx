import React, { useState } from 'react';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

interface Props {
  onCreate: () => void;
  onImport: (secret: string) => void;
  keypair: Keypair | null;
}

export const WalletCreate: React.FC<Props> = ({ onCreate, onImport, keypair }) => {
  const [secretInput, setSecretInput] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="card">
      <h2 className="card-title">{keypair ? "Wallet Security" : "Wallet Access"}</h2>
      
      {!keypair ? (
        <div className="auth-stack">
          {/* Section 1: Generate */}
          <div className="auth-section">
            <button className="primary-btn" onClick={onCreate}>
              Generate New Wallet
            </button>
            <p className="helper-text">Creates a new keypair in memory.</p>
          </div>

          <div className="divider"><span>OR</span></div>

          {/* Section 2: Import */}
          <div className="auth-section">
            <label className="input-label">Import Private Key</label>
            <div className="import-group">
              <input 
                type="password" 
                className="modern-input"
                placeholder="Paste Base58 string..."
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
              />
              <button className="secondary-btn" onClick={() => onImport(secretInput)}>
                Import
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="wallet-details">
          <div className="status-badge success">✅ Wallet Active</div>
          <div className="warning-box">
            <p className="warning-title">⚠️ Security Warning</p>
            <p className="helper-text">Anyone with this key can steal your funds. Never share it.</p>
            
            <button className="reveal-btn" onClick={() => setShowSecret(!showSecret)}>
              {showSecret ? 'Hide Private Key' : 'Reveal Private Key'}
            </button>

            {showSecret && (
              <div className="secret-display">
                <code>{bs58.encode(keypair.secretKey)}</code>
              </div>
            )}
          </div> 
        </div>
      )}
    </div>
  );
};