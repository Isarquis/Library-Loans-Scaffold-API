/* archivo: src/loan-item/loan-item.service.ts */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../../common/errors/business-errors';
import { LoanEntity } from '@modules/loan/loan.entity';
import { ItemEntity } from '@modules/item/item.entity';

@Injectable()
export class LoanItemService {
   constructor(
       @InjectRepository(LoanEntity)
       private readonly loanRepository: Repository<LoanEntity>,
   
       @InjectRepository(ItemEntity)
       private readonly itemRepository: Repository<ItemEntity>
   ) {}

   async addItemAtLoan(loanId: string, itemId: string): Promise<LoanEntity> {
       const item = await this.itemRepository.findOne({where: {id: itemId}});
       if (!item)
         throw  BusinessLogicException("The item with the given id was not found", BusinessError.NOT_FOUND);
     
       const loan = await this.loanRepository.findOne({where: {id: loanId}, relations: ["items"]})
       if (!loan)
         throw BusinessLogicException("The loan with the given id was not found", BusinessError.NOT_FOUND);
   
       loan.items = [...loan.items, item];
       return await this.loanRepository.save(loan);
     }
   
   async findItembyLoan(loanId: string, itemId: string): Promise<ItemEntity> {
       const item = await this.itemRepository.findOne({where: {id: itemId}});
       if (!item)
         throw  BusinessLogicException("The item with the given id was not found", BusinessError.NOT_FOUND)
      
       const loan = await this.loanRepository.findOne({where: {id: loanId}, relations: ["items"]});
       if (!loan)
         throw  BusinessLogicException("The loan with the given id was not found", BusinessError.NOT_FOUND)
  
       const loanItem = loan.items.find(e => e.id === item.id);
  
       if (!loanItem)
         throw BusinessLogicException("The item with the given id is not associated to the loan", BusinessError.PRECONDITION_FAILED)
  
       return loanItem;
   }
   
   async findItemsByLoanId(loanId: string): Promise<ItemEntity[]> {
       const loan = await this.loanRepository.findOne({where: {id: loanId}, relations: ["items"]});
       if (!loan)
         throw BusinessLogicException("The loan with the given id was not found", BusinessError.NOT_FOUND)
      
       return loan.items;
   }
   
   async associateItemsLoan(loanId: string, items: ItemEntity[]): Promise<LoanEntity> {
       const loan = await this.loanRepository.findOne({where: {id: loanId}, relations: ["items"]});
   
       if (!loan)
         throw  BusinessLogicException("The loan with the given id was not found", BusinessError.NOT_FOUND)
   
       for (let i = 0; i < items.length; i++) {
         const item = await this.itemRepository.findOne({where: {id: items[i].id}});
         if (!item)
           throw  BusinessLogicException("The item with the given id was not found", BusinessError.NOT_FOUND)
       }
   
       loan.items = items;
       return await this.loanRepository.save(loan);
     }
   
   async deleteItemFromLoan(loanId: string, itemId: string){
       const item = await this.itemRepository.findOne({where: {id: itemId}});
       if (!item)
         throw  BusinessLogicException("The item with the given id was not found", BusinessError.NOT_FOUND)
   
       const loan = await this.loanRepository.findOne({where: {id: loanId}, relations: ["items"]});
       if (!loan)
         throw  BusinessLogicException("The loan with the given id was not found", BusinessError.NOT_FOUND)
   
       const loanItem = loan.items.find(e => e.id === item.id);
   
       if (!loanItem)
           throw  BusinessLogicException("The item with the given id is not associated to the loan", BusinessError.PRECONDITION_FAILED)

       loan.items = loan.items.filter(e => e.id !== itemId);
       await this.loanRepository.save(loan);
   }  
}