import { Wallet } from '../wallets/wallet.model';

export async function createWallet(
  userId: string,
  address: string,
  balance: number,
  transactions: number,
) {
  const wallet = await Wallet.create({
    userId,
    address,
    balance,
    transactions,
  });
  return wallet;
}

export async function deleteWallets() {
  await Wallet.destroy({ where: {} });
}
