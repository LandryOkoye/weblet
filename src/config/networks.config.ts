import { Network } from "../types/network.types";

export const NETWORKS: Network[] = [
  {
    id: 1,
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY', // Replace with a real key
    explorerUrl: 'https://etherscan.io',
    isTestnet: false,
    chainId: 1, // Add chainId for ethers/viem
  },
  {
    id: 11155111, // Sepolia Chain ID
    name: 'Sepolia Testnet',
    currency: 'ETH',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY', // Replace with a real key
    explorerUrl: 'https://sepolia.etherscan.io',
    isTestnet: true,
    chainId: 11155111,
  },
  // Note: Goerli is deprecated, but included for completeness if needed.
  // The official recommendation is Sepolia.
  {
    id: 5,
    name: 'Goerli Testnet',
    currency: 'ETH',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_API_KEY', // Replace with a real key
    explorerUrl: 'https://goerli.etherscan.io',
    isTestnet: true,
    chainId: 5,
  },
];

export const DEFAULT_NETWORK_ID = 11155111; // Sepolia