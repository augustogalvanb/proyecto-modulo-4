import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "../products/products.service";
import { CloudinaryService } from "src/common/cloudinary.service";
import { ProductsRepository } from "../products/products.repository";
import { Product } from "src/entities/Product.entity";
import { MinSizeValidatorPipe } from "src/pipes/minSizeValidator.pipe";
import { Signin } from "src/guards/signin.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UploadFileDto } from "./uploadFile.dto";

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesServices: FilesService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly productsService: ProductsService,
        // @InjectRepository(Product) private productsRepository: Repository<Product>
    ){}

    // @Post('uploadImage')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    //     return file;
    // }
    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(Signin)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(MinSizeValidatorPipe)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Subir una imagen para el producto',
        type: UploadFileDto,
    })
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 5000000,
                        message: "El archivo debe ser menor a 5MB"
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/
                    })
                ]
            })
        ) file: Express.Multer.File
    ) {
        const result = await this.cloudinaryService.uploadImage(file)
        const imgUrl = result.secure_url
        return this.productsService.updateProduct(imgUrl, id)
    }
}