import { Injectable, Logger } from '@nestjs/common';
import { Milestone } from '../schema/milestone.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMilestoneDto } from 'src/dto/create_milestone.dto';

@Injectable()
export class MilestoneService {
  private readonly logger = new Logger(MilestoneService.name);

  constructor(
    @InjectModel(Milestone.name) private milestoneModel: Model<Milestone>,
  ) {}

  async findAll(): Promise<Milestone[]> {
    return this.milestoneModel.find().exec();
  }

  async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    const createdData = new this.milestoneModel(createMilestoneDto);
    return createdData.save();
  }

  async findByFilter(creator: string, project: string): Promise<Milestone[]> {
    const objIdCreator = new Types.ObjectId(creator);
    return this.milestoneModel
      .find({
        $or: [{ creator: objIdCreator }, { project: project }],
      })
      .exec();
  }
}
