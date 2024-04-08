import { Module } from '@nestjs/common';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from '../schema/milestone.shema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Milestone.name, schema: MilestoneSchema },
    ]),
    HttpModule,
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class MilestoneModule {}
