import { ConsoleLogger } from '@nestjs/common'

export class CustomLogger extends ConsoleLogger {
    log(message: any, context?: string) {
        if (
            context === 'RouterExplorer' ||
            context === 'RoutesResolver' ||
            context === 'WebSocketsController' ||
            context === 'InstanceLoader'
        ) {
            return
        }
        super.log(message, context ? context : '')
    }
}
