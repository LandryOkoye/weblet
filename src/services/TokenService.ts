import { 
  Connection, 
  PublicKey, 
  Keypair, 
  Transaction, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { 
  getOrCreateAssociatedTokenAccount, 
  createTransferInstruction, 
  getMint
} from '@solana/spl-token';

export const getSolBalance = async (connection: Connection, publicKey: PublicKey): Promise<number> => {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
};

export const sendSplToken = async (
  connection: Connection,
  payer: Keypair,
  recipientAddress: string,
  mintAddress: string,
  amount: number
): Promise<string> => {
  const recipient = new PublicKey(recipientAddress);
  const mint = new PublicKey(mintAddress);

  // 1. Fetch Mint Info to get decimals
  const mintInfo = await getMint(connection, mint);
  
  // 2. Adjust amount based on decimals
  const adjustedAmount = BigInt(Math.round(amount * Math.pow(10, mintInfo.decimals)));

  // 3. Get Source Account
  const sourceAta = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  // 4. Get Destination Account
  const destAta = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient
  );

  // 5. Create Transfer Instruction
  const transferInstruction = createTransferInstruction(
    sourceAta.address,
    destAta.address,
    payer.publicKey,
    adjustedAmount
  );

  // 6. Sign and Send
  const transaction = new Transaction().add(transferInstruction);
  const signature = await connection.sendTransaction(transaction, [payer]);
  
  await connection.confirmTransaction(signature, 'confirmed');
  
  return signature;
};