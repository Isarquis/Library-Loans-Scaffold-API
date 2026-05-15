/* eslint-disable prettier/prettier */
/* archivo: src/loan/loan.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../../common/errors/business-errors';
import { Repository } from 'typeorm';
import { LoanEntity } from './loan.entity';

@Injectable()
export class LoanService {
   constructor(
       @InjectRepository(LoanEntity)
       private readonly loanRepository: Repository<LoanEntity>
   ){}  
 

   async findAll(): Promise<LoanEntity[]> {
       return await this.loanRepository.find();
   }

   async findOne(id: string): Promise<LoanEntity> {
       const loan = await this.loanRepository.findOne({where: { id } });
       if (!loan)
         throw  BusinessLogicException('The loan with the given id was not found', BusinessError.NOT_FOUND);
  
       return loan;
   }
  
   async create(loan: LoanEntity): Promise<LoanEntity> {
       return await this.loanRepository.save(loan);
   }

   async update(id: string, loan: LoanEntity): Promise<LoanEntity> {
       const persistedLoan = await this.loanRepository.findOne({where:{id}});
       if (!persistedLoan)
         throw  BusinessLogicException('The loan with the given id was not found', BusinessError.NOT_FOUND);
      
       loan.id = id; 
      
       return await this.loanRepository.save(loan);
   }

   async delete(id: string) {
       const loan = await this.loanRepository.findOne({where:{id}});
       if (!loan)
         throw BusinessLogicException('The loan with the given id was not found', BusinessError.NOT_FOUND);
    
       await this.loanRepository.remove(loan);
   }


}
/* archivo: src/item/item.service.ts */
/* eslint-disable prettier/prettier */