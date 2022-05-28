import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 225 })
  lastName: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', default: 'true' })
  status: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return null;
    }
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
