import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class WorkRecord {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  projectId: number;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
  @Column('json', { nullable: true })
  model?: any;
}
