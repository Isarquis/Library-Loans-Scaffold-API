/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../../common/interceptors/business-errors/business-errors.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { ItemEntity } from './item.entity';
import { ItemDto } from './item.dto';


@ApiTags('items')
@Controller('items')
@UseInterceptors(BusinessErrorsInterceptor)
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll() {
    return await this.itemService.findAll();
  }

  @Get(':itemId')
  async findOne(@Param('itemId') itemId: string) {
    return await this.itemService.findOne(itemId);
  }

  @Post()
  async create(@Body() itemDto: ItemDto) {
    const item: ItemEntity = plainToInstance(ItemEntity, itemDto);
    return await this.itemService.create(item);
  }

  @Put(':itemId')
  async update(@Param('itemId') itemId: string, @Body() itemDto: ItemDto) {
    const item: ItemEntity = plainToInstance(ItemEntity, itemDto);
    return await this.itemService.update(itemId, item);
  }

  @Delete(':itemId')
  @HttpCode(204)
  async delete(@Param('itemId') itemId: string) {
    return await this.itemService.delete(itemId);
  }
}

/* archivo: src/item/item.controller.ts */

