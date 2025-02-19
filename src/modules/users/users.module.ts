import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { UsersController } from "../users/users.controller";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { validateUser } from "src/middelwares/validateUser.middelware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Signin } from "src/guards/signin.guard";
import { requiresAuth } from "express-openid-connect";
import { AuthController } from "./auth/auth.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepository, AuthGuard, Signin],
    controllers: [UsersController, AuthController],
    exports: [UsersService] // creo que no es necesario
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(validateUser).forRoutes(
            { path: 'users', method: RequestMethod.POST },
            { path: 'users', method: RequestMethod.PUT },
            { path: 'users', method: RequestMethod.DELETE }
        )
        consumer.apply(requiresAuth()).forRoutes('users/auth0')
    }
}