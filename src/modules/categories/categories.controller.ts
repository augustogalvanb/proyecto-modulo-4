import { Body, Controller, Get, Post } from "@nestjs/common";
import { Category } from "src/entities/Category.entity";
import { CategoriesService } from "./categories.service";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { CreateCategoryDto } from "./category.dto";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getCategories() {
            return this.categoriesService.getCategories()
    }
    
    @Post('seeder')
    addCategories(@Body() name: CreateCategoryDto) {
        return this.categoriesService.addCategories(name)
    }
}