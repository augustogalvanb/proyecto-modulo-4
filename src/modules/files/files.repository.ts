import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";

Injectable()
export class filesRepository {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>){}

    async uploadImage(file) {
        return this.productsRepository.save(file)
    }
}