import { UserRole } from '@/module/user/infrustructure/persistence/entity/role.enum'

export type JwtPayload = {
    id: number
    username: string
    email: string
    role: UserRole
}
