import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from 'src/schema/project.shema';
import { Types } from 'mongoose';
import { IEpic } from 'src/interface/epic.interface';
import { CreateProjectDto } from 'src/dto/create_project.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProjectController', () => {
  let controller: ProjectController;
  let projectService: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: {
            findAll: jest.fn(),
            findAllJirasEpic: jest.fn(),
            create: jest.fn(),
            findJirasEpicById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    projectService = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(projectService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all projects', async () => {
      const userId = new Types.ObjectId('5a9427648b0beebeb69579e7');
      const mockProjects: Project[] = [
        {
          name: 'project 1',
          workspaceId: 'worspace123',
          code: 'PR1',
          description: 'This is proj 1',
          creator: new Types.ObjectId('5a9427648b0beebeb69579e7'),
          epicId: 'E123',
          projectMember: [userId],
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
        {
          name: 'Ecommerce Website',
          workspaceId: 'worspace123',
          code: 'PR1',
          description: 'This is Ecommerce Website',
          creator: new Types.ObjectId('5a9427648b0beebeb69579e7'),
          epicId: 'E123',
          projectMember: [userId],
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      ];

      jest.spyOn(projectService, 'findAll').mockResolvedValue(mockProjects);

      const result = await controller.findAll();

      expect(result).toEqual(mockProjects);
    });
  });

  describe('findAllEpic', () => {
    it('should return all Jira epics', async () => {
      const mockEpics: IEpic[] = [
        {
          id: 10004,
          summary: 'Create Mobile App',
          description: null,
          creator: {
            accountId: '557058:7437f7bc-63d4-47a0-866a-2afc96f90918',
            displayName: 'azwar akbar',
          },
          created: '2024-04-07T17:05:04.491+0700',
          updated: '2024-04-07T17:05:04.822+0700',
        },
        {
          id: 10001,
          summary: 'Epic 1 Rest API',
          description: 'Make rest api yah',
          creator: {
            accountId: '557058:7437f7bc-63d4-47a0-866a-2afc96f90918',
            displayName: 'azwar akbar',
          },
          created: '2024-04-04T19:37:15.940+0700',
          updated: '2024-04-04T19:37:17.040+0700',
        },
      ];

      jest
        .spyOn(projectService, 'findAllJirasEpic')
        .mockResolvedValue(mockEpics);

      const result = await controller.findAllEpic();

      expect(result).toEqual(mockEpics);
    });
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const createProjectDto: CreateProjectDto = {
        name: 'Ecommerce Mobile App',
        workspaceId: new Types.ObjectId('6612b29eb0ad762daf4d6c7b'),
        code: 'ECW',
        description: 'Description of Ecommerce Mobile App',
        creator: new Types.ObjectId('5a9427648b0beebeb69579e7'),
        epicId: '10011',
        projectMember: [new Types.ObjectId('5a9427648b0beebeb69579e7')],
      };

      const createdProject = { ...createProjectDto, _id: '123456' };
      const mockReturnCreate = {
        ...createdProject,
        workspaceId: createdProject.workspaceId.toString(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };

      jest.spyOn(projectService, 'findJirasEpicById').mockResolvedValue({
        id: 10004,
        summary: 'Create Mobile App',
        description: null,
        creator: {
          accountId: '557058:7437f7bc-63d4-47a0-866a-2afc96f90918',
          displayName: 'azwar akbar',
        },
        created: '2024-04-07T17:05:04.491+0700',
        updated: '2024-04-07T17:05:04.822+0700',
      });
      jest.spyOn(projectService, 'create').mockResolvedValue(mockReturnCreate);

      const result = await controller.create(createProjectDto);

      expect(result).toEqual(mockReturnCreate);
    });

    it('should throw an error if epic ID is invalid', async () => {
      const createProjectDto: CreateProjectDto = {
        name: 'Ecommerce Mobile App',
        workspaceId: new Types.ObjectId('6612b29eb0ad762daf4d6c7b'),
        code: 'ECW',
        description: 'Description of Ecommerce Mobile App',
        creator: new Types.ObjectId('5a9427648b0beebeb69579e7'),
        epicId: '99', // Assuming this is an invalid Jira epic ID
        projectMember: [new Types.ObjectId('5a9427648b0beebeb69579e7')],
      };

      jest.spyOn(projectService, 'findJirasEpicById').mockResolvedValue(null);
      jest.spyOn(projectService, 'create').mockRejectedValue(
        new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: `Can not find Jiras Epic with ID: ${createProjectDto.epicId} `,
            error: 'Validation error',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );

      await expect(controller.create(createProjectDto)).rejects.toThrowError(
        HttpException,
      );
    });
  });
});
