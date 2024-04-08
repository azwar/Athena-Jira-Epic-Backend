// auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.shema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async validateUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
