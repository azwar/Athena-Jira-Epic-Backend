import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.shema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/utils/jwt.strategy';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '365d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [UserController, AuthController],
})
export class UserModule {}
