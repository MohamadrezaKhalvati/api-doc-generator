import { databaseConfig, TypeOrmModels } from '@/common'
import { Logger, Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: databaseConfig,
        }),
        TypeOrmModule.forFeature(TypeOrmModels),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly dataSource: DataSource) {}

    onModuleInit() {
        const logger = new Logger('Database')

        if (this.dataSource.isInitialized) {
            logger.debug(
                `Postgres connection established to ${process.env.POSTGRES_DB}--${process.env.POSTGRES_HOST}`,
            )
        } else {
            logger.error('Postgres connection not established')
        }
    }
}
