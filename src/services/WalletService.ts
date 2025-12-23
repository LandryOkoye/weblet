import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export const generateWallet = (): Keypair => {
  return Keypair.generate();
};

export const restoreWalletFromSecret = (secretKeyString: string): Keypair => {
  // Handles Base58 string format
  try {
    const secretKey = bs58.decode(secretKeyString);
    return Keypair.fromSecretKey(secretKey);
  } catch (error) {
    throw new Error('Invalid secret key format');
  }
};