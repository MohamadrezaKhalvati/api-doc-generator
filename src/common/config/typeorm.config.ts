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
        host: configService.get<string>('POSTGRES_HOST') || 'localhost',
        port: +(configService.get<string>('POSTGRES_PORT') || 5432),
        username: configService.get<string>('POSTGRES_USER') || 'postgres',
        password: configService.get<string>('POSTGRES_PASSWORD') || '',
        database: configService.get<string>('POSTGRES_DB') || 'postgres',
        synchronize: configService.get<string>('NODE_ENV') === 'DEVELOPMENT',
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
