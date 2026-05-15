/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../../common/errors/business-errors';
import { Repository } from 'typeorm';
import { ItemEntity, ItemType } from './item.entity';

@Injectable()
export class ItemService {
   constructor(
       @InjectRepository(ItemEntity)
       private readonly itemRepository: Repository<ItemEntity>
   ){}

   async findAll(type?: ItemType): Promise<ItemEntity[]> {
        return await this.itemRepository.find({where:{type}});

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
  async update(id: string, data: Partial<ItemEntity>) {
    const item = await this.itemRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    if (data.title !== undefined) {
      item.title = data.title;
    }

    if (data.type !== undefined) {
      item.type = data.type;
    }

    return this.itemRepository.save(item);
  }


   async delete(id: string) {
       const item = await this.itemRepository.findOne({where:{id}});
       if (!item)
         throw BusinessLogicException('The item with the given id was not found', BusinessError.NOT_FOUND);
    
       await this.itemRepository.remove(item);
   }
}
/* archivo: src/item/item.service.ts */