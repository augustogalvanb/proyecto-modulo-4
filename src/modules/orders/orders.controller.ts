import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Order } from "src/entities/Order.entity";
import { createOrderDto } from "./createOrder.dto";
import { Signin } from "src/guards/signin.guard";
import { ApiBearerAuth } from "@nestjs/swagger";



@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getOrders() {
        return this.ordersService.getOrders()
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(Signin)
    getOrderById(@Param('id') id: string) {
        return this.ordersService.getOrderById(id)
    }
    
    @ApiBearerAuth()
    @Post()
    @UseGuards(Signin)
    @UsePipes(new ValidationPipe({transform: true}))
    addOrder(@Body() order: createOrderDto) {
        return this.ordersService.addOrder(order)
    }
}