import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('API Integration Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth API', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@example.com', password: 'password' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    it('should login a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password' })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });

  describe('Product API', () => {
    it('should create a new product', async () => {
      const response = await request(app.getHttpServer())
        .post('/product')
        .send({ name: 'Test Product', description: 'Test Description', price: 100 })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Test Product');
      expect(response.body).toHaveProperty('description', 'Test Description');
      expect(response.body).toHaveProperty('price', 100);
    });

    it('should get a product by id', async () => {
      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      const response = await request(app.getHttpServer())
        .get(`/product/${product.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', product.id);
      expect(response.body).toHaveProperty('name', 'Test Product');
      expect(response.body).toHaveProperty('description', 'Test Description');
      expect(response.body).toHaveProperty('price', 100);
    });

    it('should update a product', async () => {
      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      const response = await request(app.getHttpServer())
        .put(`/product/${product.id}`)
        .send({ name: 'Updated Product', description: 'Updated Description', price: 200 })
        .expect(200);

      expect(response.body).toHaveProperty('id', product.id);
      expect(response.body).toHaveProperty('name', 'Updated Product');
      expect(response.body).toHaveProperty('description', 'Updated Description');
      expect(response.body).toHaveProperty('price', 200);
    });

    it('should delete a product', async () => {
      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      await request(app.getHttpServer())
        .delete(`/product/${product.id}`)
        .expect(200);

      const deletedProduct = await prisma.product.findUnique({
        where: { id: product.id },
      });

      expect(deletedProduct).toBeNull();
    });
  });

  describe('Cart API', () => {
    it('should add an item to the cart', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      const response = await request(app.getHttpServer())
        .post('/cart/add')
        .send({ userId: user.id, productId: product.id, quantity: 1 })
        .expect(201);

      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('productId', product.id);
      expect(response.body).toHaveProperty('quantity', 1);
    });

    it('should get cart items', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      await prisma.cartItem.create({
        data: { userId: user.id, productId: product.id, quantity: 1 },
      });

      const response = await request(app.getHttpServer())
        .get(`/cart/${user.id}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('userId', user.id);
      expect(response.body[0]).toHaveProperty('productId', product.id);
      expect(response.body[0]).toHaveProperty('quantity', 1);
    });

    it('should update a cart item', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      await prisma.cartItem.create({
        data: { userId: user.id, productId: product.id, quantity: 1 },
      });

      const response = await request(app.getHttpServer())
        .put('/cart/update')
        .send({ userId: user.id, productId: product.id, quantity: 2 })
        .expect(200);

      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('productId', product.id);
      expect(response.body).toHaveProperty('quantity', 2);
    });

    it('should remove a cart item', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      await prisma.cartItem.create({
        data: { userId: user.id, productId: product.id, quantity: 1 },
      });

      await request(app.getHttpServer())
        .delete('/cart/remove')
        .send({ userId: user.id, productId: product.id })
        .expect(200);

      const cartItem = await prisma.cartItem.findMany({
        where: { userId: user.id, productId: product.id },
      });

      expect(cartItem).toHaveLength(0);
    });

    it('should clear the cart', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const product = await prisma.product.create({
        data: { name: 'Test Product', description: 'Test Description', price: 100 },
      });

      await prisma.cartItem.create({
        data: { userId: user.id, productId: product.id, quantity: 1 },
      });

      await request(app.getHttpServer())
        .delete(`/cart/clear/${user.id}`)
        .expect(200);

      const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
      });

      expect(cartItems).toHaveLength(0);
    });
  });

  describe('Order API', () => {
    it('should create an order', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const response = await request(app.getHttpServer())
        .post('/order')
        .send({ userId: user.id, total: 100 })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('total', 100);
    });

    it('should get an order by id', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const order = await prisma.order.create({
        data: { userId: user.id, total: 100 },
      });

      const response = await request(app.getHttpServer())
        .get(`/order/${order.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', order.id);
      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('total', 100);
    });

    it('should update an order', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const order = await prisma.order.create({
        data: { userId: user.id, total: 100 },
      });

      const response = await request(app.getHttpServer())
        .put(`/order/${order.id}`)
        .send({ total: 200 })
        .expect(200);

      expect(response.body).toHaveProperty('id', order.id);
      expect(response.body).toHaveProperty('userId', user.id);
      expect(response.body).toHaveProperty('total', 200);
    });

    it('should delete an order', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const order = await prisma.order.create({
        data: { userId: user.id, total: 100 },
      });

      await request(app.getHttpServer())
        .delete(`/order/${order.id}`)
        .expect(200);

      const deletedOrder = await prisma.order.findUnique({
        where: { id: order.id },
      });

      expect(deletedOrder).toBeNull();
    });
  });

  describe('Payment API', () => {
    it('should process a payment', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const order = await prisma.order.create({
        data: { userId: user.id, total: 100 },
      });

      const response = await request(app.getHttpServer())
        .post('/payment')
        .send({ orderId: order.id, paymentDetails: { method: 'credit_card', amount: 100 } })
        .expect(201);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('orderId', order.id);
      expect(response.body).toHaveProperty('paymentDetails');
    });

    it('should get payment status', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', password: 'password' },
      });

      const order = await prisma.order.create({
        data: { userId: user.id, total: 100 },
      });

      const response = await request(app.getHttpServer())
        .get(`/payment/${order.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'completed');
      expect(response.body).toHaveProperty('orderId', order.id);
    });
  });
});
