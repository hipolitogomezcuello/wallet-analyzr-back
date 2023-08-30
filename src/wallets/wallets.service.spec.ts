import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.model';
import { Sequelize } from 'sequelize-typescript';
import { createMemDB } from '../utils/createMemDb';

describe('WalletsService', () => {
  let service: WalletsService;
  let memDb: Sequelize;

  afterAll(() => memDb.close());

  beforeAll(async () => {
    memDb = await createMemDB([Wallet]);
    service = new WalletsService(Wallet);
  });

  describe('create', () => {
    afterEach(async () => {
      await memDb.truncate();
    });

    it('should create a wallet', async () => {
      const mockFindBalance = jest
        .spyOn(service, 'findBalance' as any)
        .mockImplementation(() => 100);
      const mockFindTransactions = jest
        .spyOn(service, 'findTransactions' as any)
        .mockImplementation(() => []);

      const wallet = await service.create('userId', 'address', 1, 1);

      expect(wallet.address).toEqual('address');
      expect(mockFindBalance).toBeCalledWith('address');
      expect(mockFindTransactions).toBeCalledWith('address');
    });

    it('should throw an error if address is invalid', async () => {
      const mockFindBalance = jest
        .spyOn(service, 'findBalance' as any)
        .mockImplementation(() => {
          throw new Error('Invalid address');
        });
      const mockFindTransactions = jest
        .spyOn(service, 'findTransactions' as any)
        .mockImplementation(() => []);

      try {
        await service.create('userId', 'address', 1, 1);
      } catch (err) {
        expect(err.message).toEqual('Invalid address');
      }

      expect(mockFindBalance).toBeCalledWith('address');
      expect(mockFindTransactions).not.toBeCalled();
    });
  });

  describe('findById', () => {
    it('should find a wallet by id', async () => {
      const wallet = await service.create('userId', 'address', 1, 1);
      const foundWallet = await service.findById(wallet.id);

      expect(foundWallet.id).toEqual(wallet.id);
    });

    it('should return null if wallet not found', async () => {
      const foundWallet = await service.findById('id');
      expect(foundWallet).toBeNull();
    });

    it('should return null if wallet id is invalid', async () => {
      const foundWallet = await service.findById('invalidId');
      expect(foundWallet).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a wallet', async () => {
      const wallet = await service.create('userId', 'address', 1, 1);
      await service.delete(wallet.id);
      const foundWallet = await service.findById(wallet.id);
      expect(foundWallet).toBeNull();
    });

    it('should not throw an error if wallet not found', async () => {
      await service.delete('id');
    });
  });

  describe('findAll', () => {
    it('should find all wallets by userId', async () => {
      const wallet = await service.create('userId', 'address', 1, 1);
      const foundWallets = await service.findAll(wallet.userId);
      expect(foundWallets.length).toEqual(1);
    });

    it('should return empty array if no wallets found', async () => {
      const foundWallets = await service.findAll('userId');
      expect(foundWallets.length).toEqual(0);
    });
  });

  describe('update', () => {
    it('should update a wallet', async () => {
      const wallet = await service.create('userId', 'address', 1, 1);
      const updatedWallet = await service.update(wallet.id, 2, 2);
      expect(updatedWallet.usd).toEqual(2);
      expect(updatedWallet.eur).toEqual(2);
    });

    it('should throw an error if wallet not found', async () => {
      try {
        await service.update('id', 2, 2);
      } catch (err) {
        expect(err.message).toEqual('Wallet not found');
      }
    });
  });
});
