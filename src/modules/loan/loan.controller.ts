/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../../common/interceptors/business-errors/business-errors.interceptor';
import { LoanService } from './loan.service';
import { LoanEntity } from './loan.entity';
import { LoanDto } from './loan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('loans')
@Controller('loans')
@UseInterceptors(BusinessErrorsInterceptor)
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

  @Get()
  async findAll() {
    return await this.loanService.findAll();
  }

  @Get(':loanId')
  async findOne(@Param('loanId') loanId: string) {
    return await this.loanService.findOne(loanId);
  }

  @Post()
  async create(@Body() loanDto: LoanDto) {
    const loan: LoanEntity = plainToInstance(LoanEntity, loanDto);
    return await this.loanService.create(loan);
  }

  @Put(':loanId')
  async update(@Param('loanId') loanId: string, @Body() loanDto: LoanDto) {
    const loan: LoanEntity = plainToInstance(LoanEntity, loanDto);
    return await this.loanService.update(loanId, loan);
  }

  @Delete(':loanId')
  @HttpCode(204)
  async delete(@Param('loanId') loanId: string) {
    return await this.loanService.delete(loanId);
  }
}

/* archivo: src/loan/loan.controller.ts */