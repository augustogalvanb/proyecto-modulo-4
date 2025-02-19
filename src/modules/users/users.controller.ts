import { Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { createUserDto } from "./dtos/createUser.dto";
import { Signin } from "src/guards/signin.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { Request } from "express";
import { SetDefaultRolePipe } from "src/pipes/setDefaultRole.pipe";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('auth0')
    getAuth0(@Req() req: Request) {
        return JSON.stringify(req.oidc.user)
    }

    @ApiBearerAuth()
    @Get()
    // @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @UseGuards(Signin, RolesGuard)
    getUsers() {
        try {
            return this.usersService.getUsers()
        } catch (error) {
            throw new HttpException(
                {
                    status: 400,
                    error: "No se pudo obtener los usuarios"
                },
                400
            )
        }
         
    }

    @ApiBearerAuth()
    @Get(':id')
    // @UseGuards(AuthGuard)
    @UseGuards(Signin)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return this.usersService.getUserById(id)
        } catch (error) {
            throw new HttpException(
                {
                    status: 400,
                    error: "No se pudo obtener el usuario"
                },
                400
            )
        }
    }
}