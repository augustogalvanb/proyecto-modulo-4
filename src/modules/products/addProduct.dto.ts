import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "src/entities/Category.entity"
import { OrderDetails } from "src/entities/OrderDetails.entity"

export class addProductDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    description: string
    @IsNotEmpty()
    @IsNumber()
    price: number
    @IsNotEmpty()
    @IsNumber()
    stock: number
    @IsNotEmpty()
    @IsString()
    imgUrl: string
}