import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true })
  id: string;
  @Column
  username: string;
  @Column
  password: string;
  @Column({ field: 'created_at' })
  createdAt: Date;
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
