import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AddressValidator: React.FC = () => {
  const [inputAddress, setInputAddress] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [checksumAddress, setChecksumAddress] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!inputAddress) {
      setIsValid(null);
      setChecksumAddress(null);
      setFeedback('');
      return;
    }

    try {
      // ethers.isAddress checks if it's a valid address
      const valid = ethers.isAddress(inputAddress);
      setIsValid(valid);

      if (valid) {
        // ethers.getAddress returns the checksummed address (EIP-55)
        const checksummed = ethers.getAddress(inputAddress);
        setChecksumAddress(checksummed);
        
        if (inputAddress !== checksummed && inputAddress.toLowerCase() === checksummed.toLowerCase()) {
           setFeedback('Valid address (Non-checksummed)');
        } else if (inputAddress === checksummed) {
           setFeedback('Valid checksummed address (EIP-55)');
        }
      } else {
        setFeedback('Invalid Ethereum address');
        setChecksumAddress(null);
      }
    } catch (error) {
      setIsValid(false);
      setFeedback('Error validating address');
    }
  }, [inputAddress]);

  const copyToClipboard = () => {
    if (checksumAddress) {
      navigator.clipboard.writeText(checksumAddress);
      alert('Checksummed address copied!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">
        <label htmlFor="address-input" className="block text-sm font-medium text-gray-700 mb-2">
          Validate ETH Address
        </label>
        <input
          id="address-input"
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="0x..."
          className={`w-full p-3 border rounded-lg outline-none transition-colors font-mono text-sm ${
            isValid === true ? 'border-green-500 focus:ring-2 focus:ring-green-200' :
            isValid === false ? 'border-red-500 focus:ring-2 focus:ring-red-200' :
            'border-gray-300 focus:ring-2 focus:ring-indigo-200'
          }`}
        />
      </div>

      {inputAddress && (
        <div className={`p-4 rounded-lg border ${
          isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            <span className={`w-2 h-2 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className={`font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
              {feedback}
            </span>
          </div>

          {isValid && checksumAddress && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">EIP-55 Checksum Result:</p>
              <div className="flex items-center justify-between bg-white p-2 rounded border border-green-200">
                <code className="text-sm font-mono text-gray-800 break-all">{checksumAddress}</code>
                <button 
                  onClick={copyToClipboard}
                  className="ml-2 text-indigo-600 hover:text-indigo-800 text-xs font-bold uppercase"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressValidator;