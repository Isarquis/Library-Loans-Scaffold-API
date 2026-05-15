/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { User } from '../user/entities/user.entity';
import { ItemEntity } from '../item/item.entity';

export enum LoanStatus {
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
  LOST = 'lost',
}

@Entity({ name: 'loan_entity' })
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { eager: true })
  @Index()
  user!: User;

  @ManyToOne(() => ItemEntity, { eager: true })
  @Index()
  item!: ItemEntity;

  @Column({ type: 'timestamptz' })
  loanedAt!: Date;

  @Column({ type: 'timestamptz' })
  dueAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  returnedAt?: Date;

  // status enum
  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.ACTIVE,
  })
  status!: LoanStatus;

  // multa
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fineAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // opcional inverso (si quieres navegación)
  @OneToMany(() => ItemEntity, (item) => item.loan)
  items!: ItemEntity[];
}