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
      <h2>1. Wallet Access</h2>
      {!keypair ? (
        <div className="auth-actions">
          <button onClick={onCreate}>Generate New Wallet</button>
          <div className="import-row">
            <input 
              type="text" 
              placeholder="Paste Private Key (Base58)"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
            />
            <button onClick={() => onImport(secretInput)}>Import</button>
          </div>
        </div>
      ) : (
        <div className="wallet-details">
          <p className="success-text">✅ Wallet Loaded</p>
          <div className="warning-box">
            <p><strong>⚠️ Private Key (Do not share):</strong></p>
            <button onClick={() => setShowSecret(!showSecret)}>
              {showSecret ? 'Hide' : 'Reveal'} Key
            </button>
            {showSecret && (
              <code className="secret-key">
                {bs58.encode(keypair.secretKey)}
              </code>
            )}
          </div>
        </div>
      )}
    </div>
  );
};