import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  desc: string;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  qq: string;
}
