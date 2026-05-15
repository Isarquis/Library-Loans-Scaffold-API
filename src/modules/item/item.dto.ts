/* eslint-disable prettier/prettier */
import {
    IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

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