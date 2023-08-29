import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [UserModule, SequelizeModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {expiresIn: '1d'},
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {
}
