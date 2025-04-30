import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    const user = await this.userService.createUser(email, hashedPassword);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && await argon2.verify(user.password, password)) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      return { accessToken, refreshToken };
    }
    return null;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findByEmail(payload.email);
      if (user) {
        const newPayload = { email: user.email, sub: user.id };
        const newAccessToken = this.jwtService.sign(newPayload);
        const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
      }
    } catch (e) {
      return null;
    }
  }
}
