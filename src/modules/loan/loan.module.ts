import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './loan.entity';
import { LoanController } from './loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity])],
  providers: [LoanService],
  controllers:[LoanController],
})
export class LoanModule {}
