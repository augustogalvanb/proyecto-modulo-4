import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { FilesController } from "./files.controller";
import { filesRepository } from "./files.repository";
import { FilesService } from "./files.service";
import { cloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/common/cloudinary.service";
import { ConfigModule } from "@nestjs/config";
import { ProductsRepository } from "../products/products.repository";
import { ProductsService } from "../products/products.service";

@Module({
    imports: [ConfigModule.forRoot(),TypeOrmModule.forFeature([Product])],
    providers: [FilesService, filesRepository, cloudinaryConfig, CloudinaryService, ProductsService, ProductsRepository],
    controllers: [FilesController],
    exports: []
})
export class FileModule{}