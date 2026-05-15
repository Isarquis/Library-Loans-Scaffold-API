/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../../common/errors/business-errors';
import { Repository } from 'typeorm';
import { ItemEntity } from './item.entity';

@Injectable()
export class ItemService {
   constructor(
       @InjectRepository(ItemEntity)
       private readonly itemRepository: Repository<ItemEntity>
   ){}

   async findAll(): Promise<ItemEntity[]> {
       return await this.itemRepository.find({ relations: ["loan"] });
   }

   async findOne(id: string): Promise<ItemEntity> {
       const item = await this.itemRepository.findOne({where: { id }, relations: ["loan"] } );
       if (!item)
         throw  BusinessLogicException('The item with the given id was not found', BusinessError.NOT_FOUND);
  
       return item;
   }
  
   async create(item: ItemEntity): Promise<ItemEntity> {
       return await this.itemRepository.save(item);
   }

   async update(id: string, item: ItemEntity): Promise<ItemEntity> {
       const persistedItem = await this.itemRepository.findOne({where:{id}});
       if (!persistedItem)
         throw  BusinessLogicException('The item with the given id was not found', BusinessError.NOT_FOUND);
      
       item.id = id; 
      
       return await this.itemRepository.save(item);
   }

   async delete(id: string) {
       const item = await this.itemRepository.findOne({where:{id}});
       if (!item)
         throw BusinessLogicException('The item with the given id was not found', BusinessError.NOT_FOUND);
    
       await this.itemRepository.remove(item);
   }
}
/* archivo: src/item/item.service.ts */