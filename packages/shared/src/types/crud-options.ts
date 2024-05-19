export type EntityCrudOptions = {
  createDto: { new (): NonNullable<unknown> };
  updateDto: { new (): NonNullable<unknown> };
};
