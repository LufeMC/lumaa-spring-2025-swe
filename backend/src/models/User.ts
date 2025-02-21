import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser, ITask } from './interfaces';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany('Task', 'user')
  tasks!: ITask[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
} 