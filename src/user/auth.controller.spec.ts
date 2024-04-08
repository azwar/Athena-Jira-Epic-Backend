import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/schema/user.shema';
import { AuthController } from './auth.controller';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
console.log('secretKey', secretKey);
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let app: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      profilePic: '',
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    it('should return an access token if login is successful', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockValidate = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF6d2FydGVzdEBnbWFpbC5jb20iLCJzdWIiOiI2NjEyYzJhZmFhMmE3NDI0ZjU1ZmZmYzkiLCJpYXQiOjE3MTI1MDYxMDgsImV4cCI6MTc0NDA0MjEwOH0.obv3N85IeXMAgcUQjZgRnvGrs5seZrJ7hbb8lW3anUo',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'login').mockResolvedValue(mockValidate);

      const result = await controller.login(loginDto);

      expect(result).toEqual(mockValidate);
    });

    it('should throw UnauthorizedException if login fails (invalid credentials)', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'invalidPassword',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('validateUserById', () => {
    const user: User = {
      id: '66123968de7109fc68cf8b2a',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      profilePic: '',
      isActive: true,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    it('should return user if found by id', async () => {
      const userId = '66123968de7109fc68cf8b2a';

      jest.spyOn(authService, 'validateUserById').mockResolvedValue(user);

      const result = await authService.validateUserById(userId);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found by id', async () => {
      const userId = '999123123abcabcabc';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);

      await expect(authService.validateUserById(userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
