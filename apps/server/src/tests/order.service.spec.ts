import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order/order.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, PrismaService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const userId = 1;
    const total = 100;

    prisma.order.create = jest.fn().mockReturnValue({
      id: 1,
      userId,
      total,
    });

    const result = await service.createOrder(userId, total);
    expect(result).toEqual({ id: 1, userId, total });
    expect(prisma.order.create).toHaveBeenCalledWith({
      data: { userId, total },
    });
  });

  it('should get order by id', async () => {
    const orderId = 1;
    const order = {
      id: orderId,
      userId: 1,
      total: 100,
      user: {},
      orderItems: [{ product: {} }],
    };

    prisma.order.findUnique = jest.fn().mockReturnValue(order);

    const result = await service.getOrderById(orderId);
    expect(result).toEqual(order);
    expect(prisma.order.findUnique).toHaveBeenCalledWith({
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
  });

  it('should get all orders', async () => {
    const orders = [
      {
        id: 1,
        userId: 1,
        total: 100,
        user: {},
        orderItems: [{ product: {} }],
      },
      {
        id: 2,
        userId: 2,
        total: 200,
        user: {},
        orderItems: [{ product: {} }],
      },
    ];

    prisma.order.findMany = jest.fn().mockReturnValue(orders);

    const result = await service.getAllOrders();
    expect(result).toEqual(orders);
    expect(prisma.order.findMany).toHaveBeenCalledWith({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  });

  it('should update an order', async () => {
    const orderId = 1;
    const total = 150;

    prisma.order.update = jest.fn().mockReturnValue({
      id: orderId,
      total,
    });

    const result = await service.updateOrder(orderId, { total });
    expect(result).toEqual({ id: orderId, total });
    expect(prisma.order.update).toHaveBeenCalledWith({
      where: { id: orderId },
      data: { total },
    });
  });

  it('should delete an order', async () => {
    const orderId = 1;

    prisma.order.delete = jest.fn().mockReturnValue({
      id: orderId,
    });

    const result = await service.deleteOrder(orderId);
    expect(result).toEqual({ id: orderId });
    expect(prisma.order.delete).toHaveBeenCalledWith({
      where: { id: orderId },
    });
  });
});
