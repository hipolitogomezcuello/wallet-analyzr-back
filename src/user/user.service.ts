import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.userModel.create({
      id: uuidv4(),
      username,
      password: hashedPassword,
    });
  }

  async findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findOne({
      where: {
        id,
      }
    });
    await user.destroy();
  }
}