import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should hash the password and create a user', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = 'hashedPassword';
      const user = { id: 1, email };

      jest.spyOn(argon2, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(userService, 'createUser').mockResolvedValue(user);

      const result = await service.register(email, password);

      expect(argon2.hash).toHaveBeenCalledWith(password);
      expect(userService.createUser).toHaveBeenCalledWith(email, hashedPassword);
      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return tokens if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: 1, email, password: 'hashedPassword' };
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(accessToken).mockReturnValueOnce(refreshToken);

      const result = await service.login(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(argon2.verify).toHaveBeenCalledWith(user.password, password);
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ accessToken, refreshToken });
    });

    it('should return null if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { id: 1, email, password: 'hashedPassword' };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await service.login(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(argon2.verify).toHaveBeenCalledWith(user.password, password);
      expect(result).toBeNull();
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens if refresh token is valid', async () => {
      const refreshToken = 'refreshToken';
      const payload = { email: 'test@example.com', sub: 1 };
      const user = { id: 1, email: 'test@example.com' };
      const newAccessToken = 'newAccessToken';
      const newRefreshToken = 'newRefreshToken';

      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(newAccessToken).mockReturnValueOnce(newRefreshToken);

      const result = await service.refreshToken(refreshToken);

      expect(jwtService.verify).toHaveBeenCalledWith(refreshToken);
      expect(userService.findByEmail).toHaveBeenCalledWith(payload.email);
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });

    it('should return null if refresh token is invalid', async () => {
      const refreshToken = 'refreshToken';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await service.refreshToken(refreshToken);

      expect(jwtService.verify).toHaveBeenCalledWith(refreshToken);
      expect(result).toBeNull();
    });
  });
});
