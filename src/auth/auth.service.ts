import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(username: string, password: string) {
    const user: User = await this.userService.findByUsernameAndPassword(
      username,
      password,
    );
    if (user) {
      return this.generateToken(user);
    }
    throw new Error('Invalid credentials');
  }

  async signUp(username: string, password: string) {
    const user: User = await this.userService.create(username, password);
    if (user) {
      return this.generateToken(user);
    }
    throw new Error('Invalid credentials');
  }
}
