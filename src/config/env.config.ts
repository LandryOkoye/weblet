export const ENV_CONFIG = {
  INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY,
  ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY,
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  DEFAULT_NETWORK: import.meta.env.VITE_DEFAULT_NETWORK || 'sepolia',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Weblet',
};