import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  desc: string;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
  @Column('json', { nullable: true })
  projectDesignJson?: any;
}
