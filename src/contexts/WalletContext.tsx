import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { WalletContextType, WalletInfo } from '../types/wallet.types';
import { NETWORKS } from '../config/networks.config';

// 

const initialWalletState: WalletInfo = {
  address: '',
  balance: '0.0',
  network: null,
  isConnected: false,
  provider: null,
  signer: null,
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo>(initialWalletState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install it to continue.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const provider = new BrowserProvider(window.ethereum);
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      const signer = await provider.getSigner();
      
      const network = await provider.getNetwork();
      const networkInfo = NETWORKS.find(n => n.chainId === Number(network.chainId));
      
      const balanceBigInt = await provider.getBalance(address);
      const balance = ethers.formatEther(balanceBigInt);

      setWallet({
        address,
        balance,
        network: networkInfo || null,
        isConnected: true,
        provider,
        signer,
      });

    } catch (err) {
      console.error('Wallet connection error:', err);
      setError('Failed to connect wallet. Access denied or an error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(initialWalletState);
    setError(null);
  };

  // Add event listeners for account and chain changes (TODO: Full implementation in Phase 1)
  useEffect(() => {
    // Basic cleanup for unmounting
    return () => {
      // Clean up event listeners here
    };
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, isLoading, error }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};