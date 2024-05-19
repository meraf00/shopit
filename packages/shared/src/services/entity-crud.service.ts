import { NotFoundException } from '@nestjs/common';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';

export class EntityCrudService<
  TEntity extends ObjectLiteral,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends Partial<TEntity>,
> {
  constructor(private readonly repository: Repository<TEntity>) {}

  async create(dto: TCreateDto): Promise<TEntity> {
    const obj = this.repository.create(dto);
    return await this.repository.save(obj);
  }

  async update(id: any, dto: TUpdateDto): Promise<TEntity> {
    await this.repository.update(id, dto);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: any): Promise<void> {
    await this.repository.delete({
      id,
    });
  }

  async findOne(id: any): Promise<TEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: any): Promise<TEntity> {
    try {
      return await this.repository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException('not_found');
    }
  }

  async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }
}
