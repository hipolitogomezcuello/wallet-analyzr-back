import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
