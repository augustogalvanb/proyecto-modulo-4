import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const hasRole = () => {
            return requiredRoles.some((role) => user?.roles?.includes(role))
        }
        const valid = user && user.roles && hasRole()
        if(!valid) throw new ForbiddenException('No tienes permiso y no tenes permitido ingresar a esta ruta')
        return true
    }

}