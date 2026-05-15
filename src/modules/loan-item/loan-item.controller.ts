/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../../common/interceptors/business-errors/business-errors.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { Body, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LoanItemService } from './loan-item.service';
import { ItemEntity } from '@modules/item/item.entity';
import { ItemDto } from '@modules/item/item.dto';
import { it } from 'node:test';


@ApiTags('loan-items')
@Controller('loan-items')
@UseInterceptors(BusinessErrorsInterceptor)
export class LoanItemController {
   constructor(private readonly loanItemService: LoanItemService){}

   @Post(':loanId/items/:itemId')
   async addItemLoan(@Param('loanId') loanId: string, @Param('itemId') itemId: string){
       return await this.loanItemService.addItemAtLoan(loanId, itemId);
   }

   @Get(':loanId/items/:itemId')
   async findLoanItem(@Param('loanId') loanId: string, @Param('itemId') itemId: string){
       return await this.loanItemService.findItembyLoan(loanId, itemId);
   }

   @Get(':loanId/items')
   async findLoanItems(@Param('loanId') loanId: string){
       return await this.loanItemService.findItemsByLoanId(loanId);
   }
   @Put(':loanId/items')
   async associateItemsLoan(@Body() itemsDto: ItemDto[], @Param('loanId') loanId: string){
       const items = plainToInstance(ItemEntity, itemsDto);
       return await this.loanItemService.associateItemsLoan(loanId, items);
   }

   @Delete(':loanId/items/:itemId')
   @HttpCode(204)
   async deleteLoanItem(@Param('loanId') loanId: string, @Param('itemId') itemId: string){
       return await this.loanItemService.deleteItemFromLoan(loanId, itemId);
   }



}