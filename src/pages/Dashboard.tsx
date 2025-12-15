import React from 'react';
import WalletInfo from '../components/wallet/WalletInfo';
import AddressValidator from '../components/address/AddressValidator';
import TokenTransfer from '../components/transfer/TokenTransfer';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Wallet Connection & Info Panel */}
      <div className="md:col-span-1">
        <WalletInfo />
      </div>

      {/* Token Transfer Interface */}
      <div className="md:col-span-2 space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Send / Receive</h2>
        <TokenTransfer />
      </div>
      
      {/* Address Validation Component (Can be placed anywhere, or within SendForm) */}
      <div className="md:col-span-3">
        <h2 className="text-3xl font-extrabold text-gray-900 mt-4">Address Utility</h2>
        <p className="text-gray-600 mb-4">Validate an Ethereum address with EIP-55 checksum.</p>
        <AddressValidator />
      </div>
    </div>
  );
};

export default Dashboard;