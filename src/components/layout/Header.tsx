import React from 'react';
import WalletConnector from '../wallet/WalletConnector';
import { ENV_CONFIG } from '../../config/env.config';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          {ENV_CONFIG.APP_NAME}
        </h1>
        <WalletConnector />
      </div>
    </header>
  );
};

export default Header;