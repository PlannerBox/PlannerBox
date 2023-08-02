import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import Permission from "../../../domain/models/enums/permission.type";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>('permissions', [
            context.getHandler(),
            context.getClass()
        ]);
        
        if (!requiredPermissions) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        return requiredPermissions.every(permission => { return user.permissions.includes(permission); });
    }
}