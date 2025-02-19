import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Product } from "./Product.entity";

@Entity({
    name: 'categories'
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string
    @ManyToOne(() => Product, (product) => product.category_id)
    products: Product
}