import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product/product.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const productData = { name: 'Test Product', description: 'Test Description', price: 100 };
    prisma.product.create = jest.fn().mockReturnValue(productData);

    const result = await service.createProduct(productData);

    expect(result).toEqual(productData);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: productData });
  });

  it('should get a product by id', async () => {
    const productData = { id: 1, name: 'Test Product', description: 'Test Description', price: 100 };
    prisma.product.findUnique = jest.fn().mockReturnValue(productData);

    const result = await service.getProductById(1);

    expect(result).toEqual(productData);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a product', async () => {
    const productData = { id: 1, name: 'Updated Product', description: 'Updated Description', price: 150 };
    prisma.product.update = jest.fn().mockReturnValue(productData);

    const result = await service.updateProduct(1, { name: 'Updated Product', description: 'Updated Description', price: 150 });

    expect(result).toEqual(productData);
    expect(prisma.product.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'Updated Product', description: 'Updated Description', price: 150 } });
  });

  it('should delete a product', async () => {
    const productData = { id: 1, name: 'Test Product', description: 'Test Description', price: 100 };
    prisma.product.delete = jest.fn().mockReturnValue(productData);

    const result = await service.deleteProduct(1);

    expect(result).toEqual(productData);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should get all products', async () => {
    const productData = [{ id: 1, name: 'Test Product', description: 'Test Description', price: 100 }];
    prisma.product.findMany = jest.fn().mockReturnValue(productData);

    const result = await service.getAllProducts();

    expect(result).toEqual(productData);
    expect(prisma.product.findMany).toHaveBeenCalled();
  });
});
