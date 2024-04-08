import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMilestoneDto } from 'src/dto/create_milestone.dto';
import { MilestoneService } from './milestone.service';

@Controller('milestone')
export class MilestoneController {
  constructor(private milestoneService: MilestoneService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.milestoneService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createMilestoneDto: CreateMilestoneDto,
    @Req() request: any,
  ) {
    const userId = request.user._id;
    createMilestoneDto.creator = userId;

    return this.milestoneService.create(createMilestoneDto);
  }

  @Get('filter')
  @UseGuards(AuthGuard('jwt'))
  async findAllByFilter(
    @Query('creator') creatorId: string,
    @Query('project') projectId: string,
  ) {
    return this.milestoneService.findByFilter(creatorId, projectId);
  }
}
