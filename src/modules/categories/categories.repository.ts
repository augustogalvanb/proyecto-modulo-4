import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

    async getCategories(): Promise<Category[]> {
        const categories = await this.categoriesRepository.find()
        return categories
    }

    async addCategories(category): Promise<Category> {
        const newCategory = await this.categoriesRepository.save(category)
        return newCategory
    }
}

