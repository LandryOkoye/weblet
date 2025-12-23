import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import { getConnection } from '../services/SolanaConnection';
import { sendSplToken } from '../services/TokenService';
import { isValidAddress, isValidAmount } from '../utils/Validators';

interface Props {
  keypair: Keypair | null;
  network: string;
}

export const SendToken: React.FC<Props> = ({ keypair, network }) => {
  const [recipient, setRecipient] = useState('');
  const [mint, setMint] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSend = async () => {
    if (!keypair) return;

    // Validation
    if (!isValidAddress(recipient)) {
      setStatus('Invalid Recipient Address');
      setIsError(true);
      return;
    }
    if (!isValidAddress(mint)) {
      setStatus('Invalid Mint Address');
      setIsError(true);
      return;
    }
    if (!isValidAmount(amount)) {
      setStatus('Invalid Amount');
      setIsError(true);
      return;
    }

    try {
      setStatus('Processing Transaction...');
      setIsError(false);
      const conn = getConnection(network);
      
      const sig = await sendSplToken(
        conn,
        keypair,
        recipient,
        mint,
        parseFloat(amount)
      );
      
      setStatus(`Success! Signature: ${sig.slice(0, 8)}...`);
    } catch (e: any) {
      console.error(e);
      setIsError(true);
      if (e.message.includes('0x1')) {
        setStatus('Error: Insufficient Funds');
      } else {
        setStatus(`Error: ${e.message}`);
      }
    }
  };

  if (!keypair) return <div className="card disabled"><h2>3. Send Tokens</h2><p>Connect wallet first</p></div>;

  return (
    <div className="card">
      <h2 className="card-title">3. Send SPL Tokens</h2>
      <div className="input-stack">
        <div className="form-group">
          <label className="input-label">Recipient Address</label>
          <input 
            className="modern-input"
            value={recipient} 
            onChange={e => setRecipient(e.target.value)} 
            placeholder="Solana Address" 
          />
        </div>
        
        <div className="form-group">
          <label className="input-label">Token Mint Address</label>
          <input 
            className="modern-input"
            value={mint} 
            onChange={e => setMint(e.target.value)} 
            placeholder="Token Mint Address" 
          />
        </div>

        <div className="form-group">
          <label className="input-label">Amount</label>
          <input 
            type="number" 
            className="modern-input"
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            placeholder="0.00" 
          />
        </div>
        
        <button onClick={handleSend} className="primary-btn">
          Send Transaction
        </button>
      </div>
    </div>
  );
};