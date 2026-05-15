/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export enum LoanStatus {
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
  LOST = 'lost',
}

export class LoanDto {
  @IsUUID()
  @IsNotEmpty()
  readonly userId!: string;

  @IsUUID()
  @IsNotEmpty()
  readonly itemId!: string;

  @IsDateString()
  @IsNotEmpty()
  readonly loanedAt!: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dueAt!: string;

  @IsDateString()
  @IsOptional()
  readonly returnedAt?: string;

  @IsEnum(LoanStatus)
  @IsOptional()
  readonly status?: LoanStatus;

  @IsNumber()
  @IsOptional()
  readonly fineAmount?: number;
}