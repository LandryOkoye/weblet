import React from 'react';

interface Props {
  publicKey: string | null;
}

export const ReceiveToken: React.FC<Props> = ({ publicKey }) => {
  if (!publicKey) return null;
  const [copied, setCopied] = React.useState(false);

const handleCopy = () => {
  if (publicKey) {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};

  return (
    <div className="card">
      <h2>2. Receive Assets</h2>
      <p>Your Public Address:</p>
      <div className="address-container">
        <code>{publicKey}</code>
        <button onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>

  );
};