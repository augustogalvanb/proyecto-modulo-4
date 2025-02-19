import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { createUserDto } from "./dtos/createUser.dto";
import { authUserDto } from "./dtos/authUser.dto";


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers() {
        return this.usersRepository.getUsers()
    }

    getUserById(id: string) {
        return this.usersRepository.getUserById(id)
    }

    createUser(user: any) {
        return this.usersRepository.createUser(user)
    }

    signup(user: createUserDto) {
        return this.usersRepository.signup(user)
    }

    signin(credentials: authUserDto) {
        return this.usersRepository.signin(credentials)
    }
}