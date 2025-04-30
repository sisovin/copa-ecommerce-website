import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addItemToCart(userId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  async getCartItems(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });
  }

  async updateCartItem(userId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.updateMany({
      where: {
        userId,
        productId,
      },
      data: {
        quantity,
      },
    });
  }

  async removeCartItem(userId: number, productId: number) {
    return this.prisma.cartItem.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }

  async clearCart(userId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
