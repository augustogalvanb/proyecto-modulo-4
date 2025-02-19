import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { ProductsController } from "./products.controller";
import { validateProduct } from "src/middelwares/validateProduct.middelware";
import { Product } from "src/entities/Product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "../files/files.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService, ProductsRepository, FilesService],
    controllers: [ProductsController]
})

export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(validateProduct).forRoutes(
                    { path: 'products', method: RequestMethod.POST },
                    { path: 'products', method: RequestMethod.PUT },
                    { path: 'products', method: RequestMethod.DELETE }
        )
    }
}
