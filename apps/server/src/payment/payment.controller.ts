import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() paymentDto: { orderId: number; paymentDetails: any }) {
    return this.paymentService.processPayment(paymentDto.orderId, paymentDto.paymentDetails);
  }

  @Get(':orderId')
  async getPaymentStatus(@Param('orderId') orderId: number) {
    return this.paymentService.getPaymentStatus(orderId);
  }
}
