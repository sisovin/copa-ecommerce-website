import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: { userId: number; total: number }) {
    return this.orderService.createOrder(createOrderDto.userId, createOrderDto.total);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() updateOrderDto: { total: number }) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
