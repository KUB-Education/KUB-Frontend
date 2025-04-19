export interface ToDto<EntityType, DtoType> {
  toDto(entity: EntityType): DtoType;
}
