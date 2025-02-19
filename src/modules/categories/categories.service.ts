import { Body, Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Category } from "src/entities/Category.entity";


@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    getCategories() {
        return this.categoriesRepository.getCategories()
    }

    addCategories(category) {
        return this.categoriesRepository.addCategories(category)
    }
}