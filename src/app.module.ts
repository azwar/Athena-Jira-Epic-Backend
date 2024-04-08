import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { MilestoneModule } from './milestone/milestone.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONN),
    ProjectModule,
    UserModule,
    WorkspaceModule,
    MilestoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
