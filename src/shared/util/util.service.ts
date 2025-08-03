import { Injectable } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import * as crypto from 'crypto'

@Injectable()
export class UtilsService {
    private secretKey = process.env.SECRET_KEY
    private iv = process.env.IV
    private algorithm = 'aes-256-cbc'

    formatErrorData(data: ValidationError[]) {
        const formattedData: any = {}
        for (const item of data) {
            if (item?.children?.length) {
                formattedData[item.property] = item.children.map(child => {
                    if (child.children && child.children.length) {
                        return child.children.map(grandChild => ({
                            [grandChild.property]: grandChild.constraints
                                ? Object.values(grandChild.constraints)[0]
                                : undefined,
                        }))
                    } else {
                        return {
                            [child.property]: child.constraints
                                ? Object.values(child.constraints)[0]
                                : undefined,
                        }
                    }
                })
            } else {
                formattedData[item.property] = item.constraints
                    ? Object.values(item.constraints)[0]
                    : undefined
            }
        }
        return formattedData
    }

    encryptPassword(password: string) {
        const iv_buffer: Buffer = Buffer.from(this.iv, 'hex')

        const cipher = crypto.createCipheriv(
            this.algorithm,
            this.secretKey,
            iv_buffer,
        )
        let encrypted = cipher.update(password, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    comparePassword(
        inputPassword: string,
        storedEncryptedPassword: string,
    ): boolean {
        try {
            const encryptedInput = this.encryptPassword(inputPassword)
            return encryptedInput === storedEncryptedPassword
        } catch (error) {
            console.error('Error comparing passwords:', error)
            return false
        }
    }

    decryptPassword(encryptedPassword: string) {
        const iv_buffer: Buffer = Buffer.from(process.env.IV, 'hex')
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.secretKey,
            iv_buffer,
        )
        let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    parseFloat(str: string, val: number): number {
        str = str.toString()
        if (!str.includes('.')) return Number(str)
        str = str.slice(0, str.indexOf('.') + val + 1)
        return Number(str)
    }

    formatBytes(bytes: number, decimals = 1, sentence?: string) {
        if (sentence && !(bytes || bytes > 0)) {
            const rr = /(\d+)\ (bytes)/
            const bb: RegExpMatchArray | null = sentence.match(rr)
            bytes = Number((bb as RegExpMatchArray)[1])
        }

        if (!Number(bytes)) return 0

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return this.parseFloat((bytes / Math.pow(k, i)).toString(), dm)
    }

    bytesToGB(bytes: any) {
        return bytes / (1024 * 1024 * 1024)
    }

    GBToBytes(GB: any) {
        return GB * (1024 * 1024 * 1024)
    }

    convertNumbersToEnglish(text: string) {
        const mapping = {
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
        }

        return text?.replace(/[٠-٩۰-۹]/g, char => mapping[char] || char)
    }

    convertToReadableSize(bytes: number, precision = 2) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB']

        bytes = Math.max(bytes, 0)
        let pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024))
        pow = Math.min(pow, units.length - 1)

        bytes /= Math.pow(1024, pow)

        return this.parseFloat(bytes.toString(), precision) + ' ' + units[pow]
    }

    convertSecondsToMilliseconds(seconds: number) {
        return seconds * 1000
    }

    convertMinutesToMilliseconds(minutes: number) {
        return minutes * 60 * 1000
    }
}
