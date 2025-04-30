import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() data: { name: string; description: string; price: number }) {
    return this.productService.createProduct(data);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: Partial<{ name: string; description: string; price: number }>) {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
}
