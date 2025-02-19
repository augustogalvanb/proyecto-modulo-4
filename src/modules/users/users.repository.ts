import { BadRequestException, HttpCode, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { createUserDto } from "./dtos/createUser.dto";
import { authUserDto } from "./dtos/authUser.dto";
import { Role } from "src/enums/roles.enum";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    @HttpCode(201)
    async createUser(user: User) {
        const newUser = await this.usersRepository.save(user)
        return `El usuario ${newUser.email} ha sido creado con éxito`
    }

    @HttpCode(200)
    async getUsers() {
        return await this.usersRepository.find()
    }

    @HttpCode(200)
    async getUserById(id:string){
         const user = await this.usersRepository.findOne({
            where: {id},
            relations: {
                orders_id: true  // Cargar las órdenes asociadas al usuario
            },
            select: {
                orders_id: {
                    id: true,
                    date: true  // Seleccionar solo el id y la date de las órdenes
                }
            }
        })
        if(!user) {return 'Usuario no encontrado'}
        else {
            const { administrator, ...userFound } = user;
            return userFound
        }
        
    }

    async signup(user: createUserDto) {
        const checkEmail = await this.usersRepository.findOneBy({ email: user.email })
        if(checkEmail) throw new BadRequestException('El email está en uso')
        else {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            if(!hashedPassword) throw new BadRequestException('No se pudo hashear la contraseña') 
            await this.usersRepository.save({...user, password: hashedPassword })
            return `usuario ${user.email} creado con éxito, ${hashedPassword}`
        }
        
    }

    async signin(credentials: authUserDto) {
        const findEmail = await this.usersRepository.findOneBy({ email: credentials.email }) //recibo el user
        if(findEmail) {
            const validatePassword = await bcrypt.compare(credentials.password, findEmail.password ) //recibe contraseña y hash de db
            if(validatePassword){
                const userPayload = {
                    sub: findEmail.id,
                    id: findEmail.id,
                    email: findEmail.email,
                    roles: [findEmail.administrator === Role.Admin ? Role.Admin : Role.User]
                }
                const token = this.jwtService.sign(userPayload)
                return {message: 'inicio de sesión exitoso', token}
            } 
            else { throw new BadRequestException('credenciales inválidas') }
        }
        else { throw new BadRequestException('credenciales inválidas') }
        
    }
}