import { FileTypeValidator as DefaultFileTypeValidator } from '@nestjs/common'
export class FileTypeValidator extends DefaultFileTypeValidator {
    async isValid(files?: any): Promise<boolean> {
        if (!files || typeof files !== 'object') return false
        const validations: boolean[] = []
        for (const fileKey in files) {
            const fileArray = files[fileKey]
            if (Array.isArray(fileArray)) {
                for (const image of fileArray) {
                    // Await the result if super.isValid returns a Promise
                    const result = await super.isValid(image)
                    validations.push(result)
                }
            } else {
                const result = await super.isValid(fileArray)
                validations.push(result)
            }
        }
        return validations.length > 0 && validations.every(item => item)
    }
}
