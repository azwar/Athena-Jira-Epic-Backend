import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from 'src/dto/create_workspace.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace')
export class WorkspaceController {
  private readonly logger = new Logger(WorkspaceController.name);

  constructor(private workspaceService: WorkspaceService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.workspaceService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }
}
