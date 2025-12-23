import React from 'react';

interface Props {
  publicKey: string | null;
}

export const ReceiveToken: React.FC<Props> = ({ publicKey }) => {
  if (!publicKey) return null;

  return (
    <div className="card">
      <h2>2. Receive Assets</h2>
      <p>Your Public Address:</p>
      <div className="address-container">
        <code>{publicKey}</code>
        <button onClick={() => navigator.clipboard.writeText(publicKey)}>
          Copy
        </button>
      </div>
    </div>
  );
};