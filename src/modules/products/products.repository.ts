import { HttpCode, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";
import { addProductDto } from "./addProduct.dto";

@Injectable()
export class ProductsRepository {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}
    @HttpCode(200)
    async getProducts(): Promise<Product[]> {
      return await this.productsRepository.find()
    }

    @HttpCode(201)
    async addProduct(product: addProductDto): Promise<Product> {
      const newProduct = await this.productsRepository.save(product)
      return newProduct
    } 
    
    @HttpCode(200)
    async getProductById(id: string) {
        return this.productsRepository.findOneBy({id})
    }

    @HttpCode(200)
    async updateProduct(imgUrl, id) {
        const product = await this.getProductById(id)
        if (product) {
          product.imgUrl = imgUrl
          await this.productsRepository.save(product)
        }
        return 'Carga de imagen con éxito'
    }
}