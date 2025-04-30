import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number, total: number) {
    return this.prisma.order.create({
      data: {
        userId,
        total,
      },
    });
  }

  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateOrder(orderId: number, data: Partial<{ total: number }>) {
    return this.prisma.order.update({
      where: { id: orderId },
      data,
    });
  }

  async deleteOrder(orderId: number) {
    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}
