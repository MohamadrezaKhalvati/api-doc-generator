import {
    CustomLogger,
    ExceptionsFilter,
    QueryExecutionTimeInterceptor,
    TransformInterceptor,
} from '@/common'
import { UtilsService } from '@/shared/util/util.service'
import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as fs from 'fs'
import { ServerResponse } from 'http'
import * as path from 'path'
import { AppModule } from './app.module'

function enableGlobalValidations(app: INestApplication) {
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalInterceptors(new QueryExecutionTimeInterceptor())
    app.useGlobalFilters(new ExceptionsFilter())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: errors => {
                const result = new UtilsService().formatErrorData(errors)
                return new BadRequestException(result)
            },
        }),
    )
    app.enableCors({
        origin: '*',
    })
}

async function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Doc Generator')
        .setDescription(``)
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
        .setExternalDoc('Postman Collection', path.join(__dirname, 'docs-json'))
        .build()

    const metadata_ts = './metadata'
    if (fs.existsSync(path.join(__dirname, 'metadata.js'))) {
        const metadata = await import(metadata_ts)
        await SwaggerModule.loadPluginMetadata(metadata.default)
    }

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    })

    app.use('/api-doc', (_, res: ServerResponse) =>
        res.end(JSON.stringify(document)),
    )
}

async function bootstrap() {
    const logger = new CustomLogger()
    const app = await NestFactory.create<INestApplication>(AppModule, {
        logger: logger,
    })
    enableGlobalValidations(app)
    setupSwagger(app)
    await app.listen(process.env.APP_PORT ?? 3033)

    logger.log(`Server is running on port ${process.env.APP_PORT ?? 3033}`)
}
bootstrap()
