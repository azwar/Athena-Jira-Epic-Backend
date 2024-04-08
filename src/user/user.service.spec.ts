import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/schema/user.shema';
import { Model, Query } from 'mongoose';
import * as bcrypt from 'bcryptjs';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: '66123968de7109fc68cf8b2a',
          firstName: 'azwar',
          lastName: 'akbar',
          email: 'azwar.akbar@gmail.com',
          password: '123123',
          isActive: true,
          createdAt: 1712507256653,
          updatedAt: 1712507256653,
          profilePic: '',
        },
        {
          id: '6612c2afaa2a7424f55fffc9',
          firstName: 'azwar',
          lastName: 'azwar',
          email: 'azwartest@gmail.com',
          password:
            '$2a$10$6nFzS1aG5KxnjhrTxi032OQsxEfNI1WczS.F4txqZlNB0rZNSUnd2',
          isActive: true,
          createdAt: 1712505519808,
          updatedAt: 1712505519808,
          profilePic: '',
        },
      ];

      jest.spyOn(userModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(users),
      } as unknown as Query<User[], any>);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(userModel.find).toHaveBeenCalled();
    });
  });
});
