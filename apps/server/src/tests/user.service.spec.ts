import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserSpy = jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    const user = await service.createUser('test@example.com', 'hashedpassword');
    expect(user).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    expect(createUserSpy).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword',
      },
    });
  });

  it('should find a user by email', async () => {
    const findByEmailSpy = jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    const user = await service.findByEmail('test@example.com');
    expect(user).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    expect(findByEmailSpy).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  it('should update a user', async () => {
    const updateUserSpy = jest.spyOn(prisma.user, 'update').mockResolvedValue({
      id: 1,
      email: 'updated@example.com',
      password: 'updatedpassword',
    });

    const user = await service.updateUser(1, { email: 'updated@example.com', password: 'updatedpassword' });
    expect(user).toEqual({
      id: 1,
      email: 'updated@example.com',
      password: 'updatedpassword',
    });
    expect(updateUserSpy).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        email: 'updated@example.com',
        password: 'updatedpassword',
      },
    });
  });

  it('should delete a user', async () => {
    const deleteUserSpy = jest.spyOn(prisma.user, 'delete').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });

    const user = await service.deleteUser(1);
    expect(user).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    expect(deleteUserSpy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
