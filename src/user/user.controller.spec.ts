import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { UserService } from './user.service';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.shema';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let app: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/user/ (POST) - should create a new user', async () => {
    const userData: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    jest
      .spyOn(userService, 'create')
      .mockImplementation(async () => userData as any);

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(userData)
      .expect(201);

    expect(response.body).toEqual(userData);
  });
});
