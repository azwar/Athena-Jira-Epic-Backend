import { Test, TestingModule } from '@nestjs/testing';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { Model, Types } from 'mongoose';
import { Milestone } from 'src/schema/milestone.shema';
import { getModelToken } from '@nestjs/mongoose';

describe('MilestoneController', () => {
  let controller: MilestoneController;
  let service: MilestoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilestoneController],
      providers: [
        MilestoneService,
        {
          provide: getModelToken(Milestone.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<MilestoneController>(MilestoneController);
    service = module.get<MilestoneService>(MilestoneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of milestones', async () => {
      const result: Milestone[] = [
        {
          project: new Types.ObjectId('661233d1889b69c5e5a66832'),
          creator: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
          assignee: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
          reporter: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
          name: 'Create test user case',
          status: 'todo',
          storyPoint: 10,
          createdAt: 1712566657849,
          updatedAt: 1712566657849,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new milestone', async () => {
      const createDto = {
        project: new Types.ObjectId('661233d1889b69c5e5a66832'),
        assignee: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        reporter: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        creator: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        name: 'New milestoen new todo',
        status: 'todo',
        storyPoint: 10,
      };
      const createdMilestone = {
        project: new Types.ObjectId('661233d1889b69c5e5a66832'),
        creator: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        assignee: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        reporter: new Types.ObjectId('6612c2afaa2a7424f55fffc9'),
        name: 'Create test user case',
        status: 'todo',
        storyPoint: 10,
        _id: '6613b8c2a8e98d1fa1cd1a11',
        createdAt: 1712568514719,
        updatedAt: 1712568514719,
        __v: 0,
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => createdMilestone);

      const request = {
        user: {
          _id: '6612c2afaa2a7424f55fffc9',
        },
      };

      const response = await controller.create(createDto, request);
      expect(response).toBe(createdMilestone);
    });
  });
});
