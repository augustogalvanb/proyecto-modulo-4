import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

function validateRequest(request: Request) {
	const Authorization = request.headers['authorization']
    // Verificar que exista encabezado Authorization
    if(!Authorization) return false
    // Verificar que el encabezado comience con "Basic "
    if (!Authorization.startsWith('Basic ')) {
        return false;
    }
    // Obtener las credenciales después de "Basic "
    const credentials = Authorization.slice(6);  // Eliminar "Basic " (6 caracteres)
    // Dividir las credenciales en email y password usando ":"
    const [email, password] = credentials.split(':');
    if (!email || !password) {
        return false;  // Si no hay email o password, no es válido
    }
    
    return true;  // Si todo es correcto, es válido

}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request)
    }
}