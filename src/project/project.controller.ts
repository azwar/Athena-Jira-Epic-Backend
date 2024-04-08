import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/dto/create_project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.projectService.findAll();
  }

  @Get('epic')
  @UseGuards(AuthGuard('jwt'))
  async findAllEpic() {
    return this.projectService.findAllJirasEpic();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllByFilter(
    @Query('owner') ownerId: string,
    @Query('workspace') workspaceId: string,
  ) {
    // TODO: return this.projectService.findAllByOwner();
  }
}
