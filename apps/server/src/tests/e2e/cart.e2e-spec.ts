import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('Cart E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userToken: string;
  let userId: number;
  let productId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    // Create a user and get a token
    const user = await prisma.user.create({
      data: {
        email: 'testuser@example.com',
        password: 'password',
      },
    });
    userId = user.id;

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password' });

    userToken = response.body.accessToken;

    // Create a product
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'A product for testing',
        price: 100,
      },
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('should add an item to the cart', async () => {
    const response = await request(app.getHttpServer())
      .post('/cart/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId, productId, quantity: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.productId).toBe(productId);
    expect(response.body.quantity).toBe(1);
  });

  it('should get cart items', async () => {
    const response = await request(app.getHttpServer())
      .get(`/cart/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].userId).toBe(userId);
    expect(response.body[0].productId).toBe(productId);
    expect(response.body[0].quantity).toBe(1);
  });

  it('should update cart item quantity', async () => {
    const response = await request(app.getHttpServer())
      .put('/cart/update')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId, productId, quantity: 2 });

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);

    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    expect(cartItems[0].quantity).toBe(2);
  });

  it('should remove an item from the cart', async () => {
    const response = await request(app.getHttpServer())
      .delete('/cart/remove')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId, productId });

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);

    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    expect(cartItems).toHaveLength(0);
  });

  it('should clear the cart', async () => {
    // Add an item to the cart first
    await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity: 1,
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/cart/clear/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);

    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    expect(cartItems).toHaveLength(0);
  });
});
