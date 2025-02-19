import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Product } from "src/entities/Product.entity";
import { FilesService } from "../files/files.service";
import { Signin } from "src/guards/signin.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { addProductDto } from "./addProduct.dto";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly filesService: FilesService
    ){}
    
    @Get('seeder')
    getProducts () {
        const users = this.productsService.getProducts()
        if(!users){
            throw new NotFoundException('Usuarios no encontrados')
        }
        return users
    }

    @Post('seeder')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => {
            const cleanErrors = errors.map((error) => {
                return {property: error.property, constraints: error.constraints}
            })
            return new BadRequestException({
                alert: "error detectado",
                errors: cleanErrors
            })
        }
    }))
    addProduct(@Body() product: addProductDto ) {
        return this.productsService.addProduct(product)
    }
    
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id)
    }

    @ApiBearerAuth()
    // @ApiBody({ type: Object })
    @Put(':id')
    // @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @UseGuards(Signin, RolesGuard)
    updateProduct(@Param('id') id: string, @Body() imgUrl: string) {
        return this.productsService.updateProduct(imgUrl, id)
    }
}