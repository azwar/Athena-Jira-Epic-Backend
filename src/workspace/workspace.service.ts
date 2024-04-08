import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWorkspaceDto } from '../dto/create_workspace.dto';
import { Workspace } from '../schema/workspace.shema';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);

  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const { creator } = createWorkspaceDto;
    const existingWorkspace = await this.findAllByOwner(creator);

    if (existingWorkspace.length === 2) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Workspace has reached its limit. Maximum is 2.',
          error: 'Internal server errorrr',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const createdData = new this.workspaceModel(createWorkspaceDto);
    return createdData.save();
  }

  async findAll(): Promise<Workspace[]> {
    return this.workspaceModel.find().exec();
  }

  async findAllByOwner(ownerId: string): Promise<Workspace[]> {
    const id = new Types.ObjectId(ownerId);
    return this.workspaceModel.find({ creator: id }).exec();
  }
}
