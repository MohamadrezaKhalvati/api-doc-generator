import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'
import { Env } from 'enviroment'
import * as path from 'path'
import { SeederOptions } from 'typeorm-extension'
import { TypeOrmModels } from './entity.array'

export const databaseConfig = (
    configService: ConfigService<Env>,
): TypeOrmModuleOptions & SeederOptions => {
    const config: TypeOrmModuleOptions & SeederOptions = {
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: +configService.getOrThrow<string>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
        synchronize:
            configService.getOrThrow<string>('NODE_ENV') === 'DEVELOPMENT',
        entities: TypeOrmModels,
        migrations: [
            path.join(process.cwd(), '../database/migrations/*{.js,.ts}'),
        ],
        seeds: ['src/database/seeder/seeds/**/*{.ts,.js}'],
        factories: ['src/database/seeder/factories/**/*{.ts,.js}'],
        logging: false,
    }

    return config
}
