import React from 'react';
import { useWallet } from '../../contexts/WalletContext';

const WalletInfo: React.FC = () => {
  const { wallet } = useWallet();

  if (!wallet.isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Wallet Status</h3>
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span>Not Connected</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">Connect your wallet to view details.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
        Connected Wallet
      </h3>

      <div className="space-y-4">
        {/* Network Display */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Network</p>
          <div className="flex items-center justify-between">
            <span className="font-medium text-indigo-600">
              {wallet.network?.name || 'Unknown Network'}
            </span>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              ID: {wallet.network?.id}
            </span>
          </div>
        </div>

        {/* Address Display */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Address</p>
          <p className="font-mono text-sm break-all text-gray-700">
            {wallet.address}
          </p>
        </div>

        {/* Balance Display */}
        <div className="bg-indigo-600 p-4 rounded-lg text-white">
          <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Balance</p>
          <p className="text-2xl font-bold">
            {parseFloat(wallet.balance).toFixed(4)} <span className="text-lg font-normal">{wallet.network?.currency || 'ETH'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;