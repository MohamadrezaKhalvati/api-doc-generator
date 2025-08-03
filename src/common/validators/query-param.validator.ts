import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { FindOptionsOrder } from 'typeorm'
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'

export class SingleQueryParams<T = any> {
    @IsOptional()
    @Type(() => Object)
    relation?: FindOptionsRelations<T>

    @IsOptional()
    @Type(() => Object)
    select?: FindOptionsSelect<T>

    @IsOptional()
    @Type(() => Object || Array)
    filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>
}

export class QueryParams<T = any> extends SingleQueryParams<T> {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    take?: number = 200000

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    page?: number = 0

    @IsOptional()
    @Type(() => Object)
    sort?: FindOptionsOrder<T>
}

export class AdvertisingQueryParams<T = any> extends QueryParams<T> {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    min_price?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    max_price?: number

    @IsOptional()
    @Type(() => String)
    @IsString()
    phone_number?: string

    @IsOptional()
    @IsArray()
    isntallments?: number[]
}

export class QueryBuilderParams<T = any> {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    take?: number = 2000000

    @IsOptional()
    @Type(() => Object || Array)
    filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    page?: number = 0

    @IsOptional()
    @Type(() => Object)
    sort?: { field: FindOptionsOrder<T>; type: 'ASC' | 'DESC' }

    @IsOptional()
    @Type(() => Object)
    relation?: FindOptionsRelations<T>

    @IsOptional()
    @Type(() => Object)
    select?: FindOptionsSelect<T>
}
