import { useState, useCallback } from 'react';
import { Keypair } from '@solana/web3.js';
import { generateWallet, restoreWalletFromSecret } from '../services/WalletService';
import { DEFAULT_NETWORK } from '../utils/Constants';

export const useWallet = () => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [network, setNetwork] = useState<string>(DEFAULT_NETWORK);
  const [error, setError] = useState<string | null>(null);

  const createNewWallet = useCallback(() => {
    try {
      const newKeypair = generateWallet();
      setKeypair(newKeypair);
      setError(null);
    } catch (e: any) {
      setError('Failed to create wallet');
    }
  }, []);

  const loadWallet = useCallback((secret: string) => {
    try {
      const loadedKeypair = restoreWalletFromSecret(secret);
      setKeypair(loadedKeypair);
      setError(null);
    } catch (e: any) {
      setError('Invalid Private Key');
    }
  }, []);

  return {
    keypair,
    publicKey: keypair ? keypair.publicKey.toBase58() : null,
    createWallet: createNewWallet,
    loadWalletFromSecret: loadWallet,
    network,
    setNetwork,
    error,
    setError
  };
};