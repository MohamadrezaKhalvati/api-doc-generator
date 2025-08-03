export interface IMapper<Domain, Entity> {
    toPersistence(domain: Domain): Partial<Entity>
    toDomain(entity: Entity): Domain
}
