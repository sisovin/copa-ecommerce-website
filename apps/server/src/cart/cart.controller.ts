import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addItemToCart(@Body() body: { userId: number; productId: number; quantity: number }) {
    return this.cartService.addItemToCart(body.userId, body.productId, body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getCartItems(@Param('userId') userId: number) {
    return this.cartService.getCartItems(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateCartItem(@Body() body: { userId: number; productId: number; quantity: number }) {
    return this.cartService.updateCartItem(body.userId, body.productId, body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  async removeCartItem(@Body() body: { userId: number; productId: number }) {
    return this.cartService.removeCartItem(body.userId, body.productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: number) {
    return this.cartService.clearCart(userId);
  }
}
