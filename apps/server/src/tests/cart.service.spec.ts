import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart/cart.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, PrismaService],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add item to cart', async () => {
    const userId = 1;
    const productId = 1;
    const quantity = 2;

    prisma.cartItem.create = jest.fn().mockReturnValue({
      userId,
      productId,
      quantity,
    });

    const result = await service.addItemToCart(userId, productId, quantity);
    expect(result).toEqual({ userId, productId, quantity });
    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: { userId, productId, quantity },
    });
  });

  it('should get cart items', async () => {
    const userId = 1;
    const cartItems = [
      { userId, productId: 1, quantity: 2, product: {} },
      { userId, productId: 2, quantity: 1, product: {} },
    ];

    prisma.cartItem.findMany = jest.fn().mockReturnValue(cartItems);

    const result = await service.getCartItems(userId);
    expect(result).toEqual(cartItems);
    expect(prisma.cartItem.findMany).toHaveBeenCalledWith({
      where: { userId },
      include: { product: true },
    });
  });

  it('should update cart item', async () => {
    const userId = 1;
    const productId = 1;
    const quantity = 3;

    prisma.cartItem.updateMany = jest.fn().mockReturnValue({
      count: 1,
    });

    const result = await service.updateCartItem(userId, productId, quantity);
    expect(result).toEqual({ count: 1 });
    expect(prisma.cartItem.updateMany).toHaveBeenCalledWith({
      where: { userId, productId },
      data: { quantity },
    });
  });

  it('should remove cart item', async () => {
    const userId = 1;
    const productId = 1;

    prisma.cartItem.deleteMany = jest.fn().mockReturnValue({
      count: 1,
    });

    const result = await service.removeCartItem(userId, productId);
    expect(result).toEqual({ count: 1 });
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { userId, productId },
    });
  });

  it('should clear cart', async () => {
    const userId = 1;

    prisma.cartItem.deleteMany = jest.fn().mockReturnValue({
      count: 1,
    });

    const result = await service.clearCart(userId);
    expect(result).toEqual({ count: 1 });
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { userId },
    });
  });
});
