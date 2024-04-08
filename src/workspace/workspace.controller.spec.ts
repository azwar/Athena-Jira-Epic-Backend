import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Workspace } from 'src/schema/workspace.shema';
import { Types } from 'mongoose';
import { CreateWorkspaceDto } from 'src/dto/create_workspace.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('WorkspaceController', () => {
  let controller: WorkspaceController;
  let workspaceService: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceController],
      providers: [
        {
          provide: WorkspaceService,
          useFactory: () => ({
            findAll: jest.fn(),
            create: jest.fn(),
            findAllByOwner: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
    workspaceService = module.get<WorkspaceService>(WorkspaceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(workspaceService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all workspaces', async () => {
      const creatorId = new Types.ObjectId('66123968de7109fc68cf8b2a');
      const mockWorkspaces: Workspace[] = [
        {
          name: 'Workspace 1',
          description: 'Description workspace 1',
          creator: creatorId,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
        {
          name: 'Workspace 2',
          description: 'Description workspace 2',
          creator: creatorId,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      ];

      jest.spyOn(workspaceService, 'findAll').mockResolvedValue(mockWorkspaces);

      const result = await controller.findAll();

      expect(result).toEqual(mockWorkspaces);
    });

    it('should throw an error if maximum workspace limit is reached', async () => {
      const creatorIdStr = '66123968de7109fc68cf8b2a';

      const createWorkspaceDto: CreateWorkspaceDto = {
        name: 'New Workspace',
        description: 'Description new workspace',
        creator: creatorIdStr,
      };

      const creatorId = new Types.ObjectId('66123968de7109fc68cf8b2a');
      const mockWorkspaces: Workspace[] = [
        {
          name: 'Workspace 1',
          description: 'Description workspace 1',
          creator: creatorId,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
        {
          name: 'Workspace 2',
          description: 'Description workspace 2',
          creator: creatorId,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      ];

      jest
        .spyOn(workspaceService, 'findAllByOwner')
        .mockResolvedValue(mockWorkspaces);
      jest.spyOn(workspaceService, 'create').mockRejectedValue(
        new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Workspace has reached its limit. Maximum is 2.',
            error: 'Internal server errorrr',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      const response = controller.create(createWorkspaceDto);
      expect(workspaceService.create).toHaveBeenCalled();
      await expect(response).rejects.toThrowError(HttpException);
    });
  });
});
