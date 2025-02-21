import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ITask, IUser } from './interfaces';

@Entity('tasks')
export class Task implements ITask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: false })
  isComplete!: boolean;

  @ManyToOne('User', 'tasks')
  user!: IUser;

  @Column()
  userId!: number;
} 