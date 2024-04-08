import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { getModelToken } from '@nestjs/mongoose';
import { Workspace } from 'src/schema/workspace.shema';

describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: getModelToken(Workspace.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            exec: jest.fn().mockResolvedValue([]),
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findOneAndUpdate: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
