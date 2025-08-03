import { FindAll } from '@/common/types/find-all'
import {
    QueryBuilderParams,
    QueryParams,
    SingleQueryParams,
} from '@/common/validators/query-param.validator'
import { SelectQueryBuilder } from 'typeorm'

export abstract class IBaseRepository<T> {
    abstract delete(id: number): Promise<void>
    abstract findWithPagination(skip: number, take: number): Promise<T[]>
    abstract exists(filter: Partial<T>): Promise<boolean>
    abstract findOrCreate(
        filter: Partial<T>,
        defaultData: Partial<T>,
    ): Promise<T>
    abstract create(body: Partial<T>): Promise<T>
    abstract hardDelete(id: number)

    abstract findAllNoPagination(query: QueryParams<T>): Promise<T[]>

    abstract findAll(
        query: QueryParams<T> | QueryBuilderParams<T>,
        withDeleted?: boolean,
    ): Promise<FindAll<T>>

    abstract findOne(
        id: number,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T>

    abstract bulkCreate(bodies: Partial<T>[]): Promise<T[]>

    abstract bulkUpdate(
        updates: { id: number; data: Partial<T> }[],
    ): Promise<T[]>

    abstract bulkDelete(ids: number[])

    abstract findOneBy(
        obj: Partial<T>,
        query?: SingleQueryParams<T>,
        ignoreValidation?: boolean,
    ): Promise<T>

    abstract update(id: number, body: Partial<T>): Promise<T>

    abstract softDelete(id: number)

    abstract count(
        query: QueryBuilderParams<T>,
        withDeleted?: boolean,
    ): Promise<Number>

    abstract softRemove(entity: T | T[])

    abstract findAllQueryBuilder<T extends Record<string, any>>(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    )

    abstract findAllRaw<T extends Record<string, any>>(
        query: QueryBuilderParams<T>,
        cb: SelectQueryBuilder<T>,
    ): Promise<FindAll<T>>
}
