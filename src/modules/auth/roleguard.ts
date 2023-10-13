import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLE_ENUM } from '../enums/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    // Check if the user has at least one of the required roles.
    const hasRequiredRole = user?.role === ROLE_ENUM.ADMIN || requiredRoles.includes(user?.role)

    return hasRequiredRole
  }
}
