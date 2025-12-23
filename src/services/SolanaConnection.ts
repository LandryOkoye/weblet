import { Connection } from '@solana/web3.js';

export const getConnection = (endpoint: string): Connection => {
  return new Connection(endpoint, 'confirmed');
};