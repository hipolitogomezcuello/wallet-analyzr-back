import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.model';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletModule {}
