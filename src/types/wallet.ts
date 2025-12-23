import { Keypair } from '@solana/web3.js';

export interface WalletState {
  keypair: Keypair | null;
  publicKey: string | null;
  balance: number;
}

export interface NetworkConfig {
  name: string;
  url: string;
}