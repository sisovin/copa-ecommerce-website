import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('Order E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userToken: string;
  let userId: number;
  let orderId: number;

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
  });

  afterAll(async () => {
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('should create an order', async () => {
    const response = await request(app.getHttpServer())
      .post('/order')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ userId, total: 100 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.total).toBe(100);

    orderId = response.body.id;
  });

  it('should get an order by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/order/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', orderId);
    expect(response.body.userId).toBe(userId);
    expect(response.body.total).toBe(100);
  });

  it('should get all orders', async () => {
    const response = await request(app.getHttpServer())
      .get('/order')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id', orderId);
    expect(response.body[0].userId).toBe(userId);
    expect(response.body[0].total).toBe(100);
  });

  it('should update an order', async () => {
    const response = await request(app.getHttpServer())
      .put(`/order/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ total: 150 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', orderId);
    expect(response.body.total).toBe(150);
  });

  it('should delete an order', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/order/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', orderId);

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    expect(order).toBeNull();
  });
});
