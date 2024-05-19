import { Get } from '@nestjs/common';
import { BaseCrudService } from '../services';
import { ObjectLiteral } from 'typeorm';

export class BaseCrudController<TEntity extends ObjectLiteral> {
  constructor(private readonly service: BaseCrudService<TEntity>) {}

  async create(entity: TEntity): Promise<TEntity> {
    return await this.service.create(entity);
  }

  async update(id: any, entity: TEntity): Promise<TEntity> {
    return await this.service.update(id, entity);
  }

  async delete(id: any): Promise<void> {
    await this.service.delete(id);
  }

  async findOne(id: any): Promise<TEntity> {
    return await this.service.findOne(id);
  }

  async findOneOrFail(id: any): Promise<TEntity> {
    return await this.service.findOneOrFail(id);
  }

  @Get()
  async findAll(): Promise<TEntity[]> {
    return await this.service.findAll();
  }
}
