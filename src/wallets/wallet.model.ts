import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'wallets' })
export class Wallet extends Model {
  @Column({ primaryKey: true })
  id: string;
  @Column({ field: 'user_id' })
  userId: string;
  @Column
  address: string;
  @Column
  balance: number;
  @Column
  usd: number;
  @Column
  eur: number;
  @Column({ field: 'created_at' })
  createdAt: Date;
  @Column({ field: 'updated_at' })
  updatedAt: Date;
  @Column({ field: 'is_old' })
  isOld: boolean;
}
