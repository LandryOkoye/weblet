import React from 'react';
import { useWallet } from '../../contexts/WalletContext';

const WalletConnector: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, isLoading, error } = useWallet();

  if (wallet.isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 hidden md:block">
          {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
        </span>
        <button
          onClick={disconnectWallet}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={connectWallet}
        disabled={isLoading}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 disabled:opacity-50"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1 absolute top-full right-4">{error}</p>}
    </>
  );
};

export default WalletConnector;