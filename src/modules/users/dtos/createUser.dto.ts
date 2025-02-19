import { IsNotEmpty, IsString, IsEmail, IsNumber, MinLength, MaxLength, Matches, IsEnum } from "class-validator"
import { IsPasswordMatch } from "../../../decorators/confirmPassword.decorator"
import { Role } from "src/enums/roles.enum"
import { ApiProperty } from "@nestjs/swagger"

export class createUserDto {
    @IsNotEmpty()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3)
    @MaxLength(80, { message: 'El nombre no puede superar los 80 caracteres' })
    @ApiProperty({
        description: 'El nombre del usuario debe tener entre 3 y 80 caracteres',
        example: 'Marcos'
    })
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)
    password: string
    @IsNotEmpty()
    @IsString()
    @IsPasswordMatch('password', { message: 'Las contraseñas no coinciden' }) //decorador personalizado
    confirmPassword: string
    @IsNotEmpty()
    @IsNumber()
    phone: number
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string
    @IsNotEmpty()
    // @IsString()
    @IsEnum(Role)
    administrator: Role
}