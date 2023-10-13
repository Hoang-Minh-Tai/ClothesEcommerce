import { SetMetadata } from '@nestjs/common'
import { ROLE_ENUM } from 'src/modules/enums/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: ROLE_ENUM[]) => SetMetadata(ROLES_KEY, roles)
