import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "src/entities/Product.entity";
import { addProductDto } from "./addProduct.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProducts() {
        return this.productsRepository.getProducts()
    }

    addProduct(product: addProductDto) {
        return this.productsRepository.addProduct(product)
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }

    updateProduct(imgUrl, id) {
        return this.productsRepository.updateProduct(imgUrl, id)
    }
}