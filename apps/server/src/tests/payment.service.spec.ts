import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment/payment.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, PrismaService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process payment', async () => {
    const orderId = 1;
    const paymentDetails = { amount: 100 };

    const result = await service.processPayment(orderId, paymentDetails);
    expect(result).toEqual({
      status: 'success',
      orderId,
      paymentDetails,
    });
  });

  it('should get payment status', async () => {
    const orderId = 1;

    const result = await service.getPaymentStatus(orderId);
    expect(result).toEqual({
      status: 'completed',
      orderId,
    });
  });
});
