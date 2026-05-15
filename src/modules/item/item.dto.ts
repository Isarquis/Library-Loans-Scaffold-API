/* eslint-disable prettier/prettier */
/* archivo: src/item/item.dto.ts */
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ItemType } from './item.entity';

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  readonly title: string;

  @IsEnum(ItemType)
  readonly type: ItemType;

}

export class FindItemsQueryDto {
  @IsOptional()
  @IsEnum(ItemType)
  type?: ItemType;
}

export class UpdateItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly title?: string;

  @ApiPropertyOptional({ enum: ItemType })
  @IsOptional()
  @IsEnum(ItemType)
  readonly type?: ItemType;
}