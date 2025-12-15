import { Network } from './network.types';
import { BrowserProvider, Signer } from 'ethers';

// State to manage the connected wallet
export interface WalletInfo {
  address: string;
  balance: string; // Stored as a formatted string (e.g., '1.234 ETH')
  network: Network | null;
  isConnected: boolean;
  provider: BrowserProvider | null; // The ethers provider from MetaMask
  signer: Signer | null; // The ethers signer for signing transactions
}

// Actions/methods for the wallet context
export interface WalletContextType {
  wallet: WalletInfo;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}