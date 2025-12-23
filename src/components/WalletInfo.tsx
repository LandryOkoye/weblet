import React, { useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';
import { getConnection } from '../services/SolanaConnection';
import { getSolBalance } from '../services/TokenService';

interface Props {
  keypair: Keypair | null;
  network: string;
}

export const WalletInfo: React.FC<Props> = ({ keypair, network }) => {
  const [balance, setBalance] = useState<number>(0);

  const updateBalance = async () => {
    if (!keypair) return;
    const conn = getConnection(network);
    const bal = await getSolBalance(conn, keypair.publicKey);
    setBalance(bal);
  };

  useEffect(() => {
    updateBalance();
    const interval = setInterval(updateBalance, 10000);
    return () => clearInterval(interval);
  }, [keypair, network]);

  if (!keypair) return null;

  return (
    <div className="wallet-info-bar">
      <span>Network: <strong>{network.includes('devnet') ? 'Devnet' : 'Testnet'}</strong></span>
      <span>Balance: <strong>{balance.toFixed(4)} SOL</strong></span>
      <button onClick={updateBalance} className="refresh-btn">↻</button>
    </div>
  );
};