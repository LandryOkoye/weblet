import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/WalletContext';

const TokenTransfer: React.FC = () => {
  const { wallet } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.signer) return;

    // Basic validation
    if (!ethers.isAddress(recipient)) {
      setError('Invalid recipient address');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setIsTransmitting(true);
      setError(null);
      setTxHash(null);

      // Parse amount to Wei
      const value = ethers.parseEther(amount);

      // Send Transaction
      const tx = await wallet.signer.sendTransaction({
        to: recipient,
        value: value,
      });

      setTxHash(tx.hash);
      
      // Optionally wait for confirmation (blocking UI, better to show pending state)
      // await tx.wait(); 

      // Reset form
      setAmount('');
      setRecipient('');

    } catch (err: any) {
      console.error(err);
      // Handle generic ethers errors (user rejection, insufficient funds)
      if (err.code === 'ACTION_REJECTED') {
        setError('Transaction rejected by user.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setError('Insufficient funds for transaction.');
      } else {
        setError('Transaction failed. Check console for details.');
      }
    } finally {
      setIsTransmitting(false);
    }
  };

  if (!wallet.isConnected) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">Connect wallet to transfer tokens</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-600 p-4">
        <h3 className="text-white font-bold text-lg">Send Transaction</h3>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSend} className="space-y-6">
          {/* Recipient Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm"
              disabled={isTransmitting}
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ({wallet.network?.currency || 'ETH'})</label>
            <div className="relative">
              <input
                type="number"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                disabled={isTransmitting}
              />
              <button 
                type="button"
                onClick={() => setAmount(wallet.balance)} // Simple Max button logic
                className="absolute right-2 top-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Available: {parseFloat(wallet.balance).toFixed(4)} {wallet.network?.currency}</p>
          </div>

          {/* Feedback Section */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {txHash && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-green-700 text-sm font-bold">Transaction Sent!</p>
              <a 
                href={`${wallet.network?.explorerUrl}/tx/${txHash}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-600 text-xs hover:underline break-all"
              >
                View on Explorer: {txHash}
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isTransmitting || !recipient || !amount}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-colors shadow-md ${
              isTransmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isTransmitting ? 'Processing...' : 'Send Tokens'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenTransfer;