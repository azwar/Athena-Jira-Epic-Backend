import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schema/project.shema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    HttpModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
