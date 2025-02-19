import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Order } from "src/entities/Order.entity";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    getOrders() {
        return this.ordersRepository.getOrders()
    }

    addOrder(order) {
        return this.ordersRepository.addOrder(order)
    }

    getOrderById(id: string) {
        return this.ordersRepository.getOrderById(id)
    }
}