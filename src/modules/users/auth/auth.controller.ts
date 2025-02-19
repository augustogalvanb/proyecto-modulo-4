import { Body, Controller, HttpException, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Signin } from "src/guards/signin.guard";
import { UsersService } from "../users.service";
import { createUserDto } from "../dtos/createUser.dto";
import { authUserDto } from "../dtos/authUser.dto";
import { SetDefaultRolePipe } from "src/pipes/setDefaultRole.pipe";

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}


    @Post('signup')
    @UsePipes(SetDefaultRolePipe, new ValidationPipe({ transform: true }))
    signup(@Body() user: createUserDto) {
            try {
                        return this.usersService.signup(user)
                    } catch (error) {
                        throw new HttpException(
                            {
                                status: 400,
                                error: "No se pudo crear el usuario"
                            },
                            400
                        )
                    }
    }
    
    @Post('signin')
    //@UseGuards(Signin)
    signin(@Body() credentials: authUserDto) {
            return this.usersService.signin(credentials)
    }
    
}