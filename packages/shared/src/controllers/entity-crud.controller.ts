import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { EntityCrudService } from '../services';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { EntityCrudOptions } from '../types/crud-options';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

class BaseEntityDto {}

export function EntityCrudController<
  TEntity extends ObjectLiteral,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends Partial<TEntity>,
>(options: EntityCrudOptions) {
  class EntityCrudControllerHost {
    constructor(
      public readonly service: EntityCrudService<
        TEntity,
        TCreateDto,
        TUpdateDto
      >,
    ) {}

    @ApiBody({ type: options?.createDto || BaseEntityDto })
    @ApiResponse({
      status: HttpStatus.CREATED,
      type: options?.createDto || BaseEntityDto,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body(
        new ValidationPipe({
          transform: true,
          expectedType: options?.createDto || BaseEntityDto,
        }),
      )
      dto: TCreateDto,
    ): Promise<TEntity> {
      return await this.service.create(dto);
    }

    @ApiBody({ type: options?.updateDto || BaseEntityDto })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({
      status: HttpStatus.OK,
      type: options?.createDto || BaseEntityDto,
    })
    @Put(':id')
    async update(
      @Param('id') id: any,
      @Body(
        new ValidationPipe({
          transform: true,
          expectedType: options?.updateDto || BaseEntityDto,
        }),
      )
      dto: TUpdateDto,
    ): Promise<TEntity> {
      return await this.service.update(id, dto);
    }

    @ApiParam({ name: 'id', required: true })
    @ApiResponse({
      status: HttpStatus.NO_CONTENT,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@Param('id') id: any): Promise<void> {
      await this.service.delete(id);
    }

    @ApiParam({ name: 'id', required: true })
    @ApiResponse({
      status: HttpStatus.OK,
      type: options?.createDto || BaseEntityDto,
    })
    @Get(':id')
    async findOne(@Param('id') id: any): Promise<TEntity> {
      return await this.service.findOneOrFail(id);
    }

    @Get()
    @ApiResponse({
      status: HttpStatus.OK,
      type: options?.createDto || BaseEntityDto,
      isArray: true,
    })
    async findAll(): Promise<TEntity[]> {
      return await this.service.findAll();
    }
  }

  return EntityCrudControllerHost;
}
