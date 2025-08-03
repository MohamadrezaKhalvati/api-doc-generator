import { Module } from '@nestjs/common'
import { UtilsService } from './util.service'

@Module({
    providers: [UtilsService],
    exports: [UtilsService],
})
export class UtilModule {}
