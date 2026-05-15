import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from '@modules/loan/loan.entity';
import { LoanItemController } from './loan-item.controller';
import { LoanItemService } from './loan-item.service';
import { ItemEntity } from '@modules/item/item.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity, ItemEntity])],
  providers: [LoanItemService],
  controllers: [LoanItemController]
})
export class LoanItemModule {}
