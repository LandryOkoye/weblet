export interface Network {
  id: number;
  chainId: number; // Added for convenience with web3 libs
  name: string;
  currency: string;
  rpcUrl: string;
  explorerUrl: string;
  isTestnet: boolean;
}