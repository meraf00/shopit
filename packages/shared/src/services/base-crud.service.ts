import { Repository, ObjectLiteral } from 'typeorm';

export class BaseCrudService<TEntity extends ObjectLiteral> {
  constructor(private readonly repository: Repository<TEntity>) {}

  async create(entity: TEntity): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  async update(id: any, entity: TEntity): Promise<TEntity> {
    await this.repository.update(id, entity);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: any): Promise<void> {
    await this.repository.delete(id);
  }

  async findOne(id: any): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  async findOneOrFail(id: any): Promise<TEntity> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (e) {
      throw new Error('not_found');
    }
  }

  async findAll(): Promise<TEntity[]> {
    console.log(this.repository);
    return await this.repository.find();
  }
}
