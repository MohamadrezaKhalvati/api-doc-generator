import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserAgent = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()

        const agentString = request.headers['user-agent'] || null

        const browserMatch = agentString.match(
            /(firefox|chrome|safari|opera|edge|ie)\/?\s*([\d.]+)/i,
        )
        const osMatch = agentString.match(/\(([^)]+)\)/)

        return {
            raw: agentString,
            browser: {
                name: browserMatch ? browserMatch[1] : null,
                version: browserMatch ? browserMatch[2] : null,
            },
            os: {
                name: osMatch ? osMatch[1].split(';')[0] : null,
                version: null,
            },
            device: {
                model: null,
                type: null,
                vendor: null,
            },
            engine: {
                name: null,
                version: null,
            },
            cpu: {
                architecture: null,
            },
        }
    },
)
