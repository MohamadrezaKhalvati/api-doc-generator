export interface Env {
    APP_PORT: string
    PAYMENT_ACTIVE: boolean
    NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION' | 'TEST'
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_PORT: string
    POSTGRES_HOST: string
    POSTGRES_DB: string
    JWT_SECRET: string
    ADMIN_USERNAME: string
    ADMIN_PASSWORD: string
    JWT_EXPIRE_TIME: string
    SECRET_KEY: string
    IV: string
    FRONTEND_URL: string
    API_URL: string
    SMS_USERNAME: string
    SMS_PASSWORD: string
    SMS_NUMBER: string
    ZARINPAL_MERCHANT_ID: string
    ZIBAL_TOKEN: string
    CALL_BACK_URL: string
    MELI_PAYAMK_API: string
    BASE_IMAGE_URL: string
    DOMAIN: string
    SWAGGER_USERNAME: string
    SWAGGER_PASSWORD: string
    ADMIN_URL: string
    BOT_URL: string
    VALIDATE_USER: 'active' | 'deactive'
    SEND_SMS: 'YES' | 'NO'
    DOCKER_EXPORT_APP_PORT: string
    MONGO_URL: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export {}
