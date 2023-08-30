import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallets/wallet.module';
import { Wallet } from './wallets/wallet.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'cripto',
      models: [User, Wallet],
    }),
    UserModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
