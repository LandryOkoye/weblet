import { PublicKey } from '@solana/web3.js';

export const isValidAddress = (address: string): boolean => {
  try {
    const pubKey = new PublicKey(address);
    return PublicKey.isOnCurve(pubKey.toBytes());
  } catch (e) {
    return false;
  }
};

export const isValidAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};