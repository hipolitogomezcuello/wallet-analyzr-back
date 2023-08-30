import { Sequelize } from 'sequelize-typescript';
import { createMemDB } from '../utils/createMemDb';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let memDb: Sequelize;

  afterAll(() => memDb.close());

  beforeAll(async () => {
    memDb = await createMemDB([User]);
    service = new UserService(User);
  });

  afterEach(async () => {
    await memDb.truncate();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = await service.create('username', 'password');

      expect(user.username).toEqual('username');
      expect(user.id).toBeDefined();
      expect(user.password !== 'password').toBeTruthy();
    });

    it('should throw an error if username is already taken', async () => {
      await service.create('username', 'password');
      try {
        await service.create('username', 'password');
      } catch (err) {
        expect(err.message).toEqual('Username already taken');
      }
    });
  });

  describe('findByUsernameAndPassword', () => {
    it('should find a user by username and password', async () => {
      await service.create('username', 'password');
      const user = await service.findByUsernameAndPassword(
        'username',
        'password',
      );
      expect(user.username).toEqual('username');
      expect(user.password !== 'password').toBeTruthy();
    });

    it('should return null if user not found', async () => {
      const user = await service.findByUsernameAndPassword(
        'username',
        'password',
      );
      expect(user).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      await service.create('username', 'password');
      const user = await service.findByUsernameAndPassword(
        'username',
        'wrongPassword',
      );
      expect(user).toBeNull();
    });
  });
});
