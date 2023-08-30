import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet)
    private walletModel: typeof Wallet,
  ) {}

  private async findBalance(address: string): Promise<number> {
    const response = await fetch(
      process.env.WALLET_API_URL.replace('{address}', address),
    );
    const data = await response.json();
    if (data.status === '1') {
      return +data.result;
    } else {
      throw new Error('Invalid address');
    }
  }

  private async findTransactions(address: string): Promise<any[]> {
    const response = await fetch(
      process.env.TRANSACTIONS_API_URL.replace('{address}', address),
    );
    const data = await response.json();
    if (data.status === '1') {
      return data.result;
    } else {
      throw new Error('Invalid address');
    }
  }

  async findById(id: string): Promise<Wallet> {
    return await this.walletModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(
    userId: string,
    address: string,
    usd: number,
    eur: number,
  ): Promise<Wallet> {
    const balance = await this.findBalance(address);
    const transactions = await this.findTransactions(address);
    const oldestTransaction = transactions[0];
    const isOld =
      oldestTransaction &&
      new Date(+oldestTransaction.timeStamp) <
        new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    return await this.walletModel.create({
      id: uuidv4(),
      userId,
      address,
      balance,
      usd,
      eur,
      isOld,
    });
  }

  async delete(id: string): Promise<void> {
    const wallet = await this.walletModel.findOne({
      where: {
        id,
      },
    });
    if (wallet) {
      await wallet.destroy();
    }
  }

  async findAll(userId: string): Promise<Wallet[]> {
    return await this.walletModel.findAll({
      where: {
        userId,
      },
    });
  }

  async update(id: string, usd: number, eur: number): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({
      where: {
        id,
      },
    });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    wallet.usd = usd;
    wallet.eur = eur;
    await wallet.save();
    return wallet;
  }
}
