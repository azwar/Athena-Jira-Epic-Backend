import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ required: true })
  readonly workspaceId: string;

  @Prop({ required: true, maxlength: 5 })
  readonly code: string;

  @Prop({ maxlength: 500 })
  readonly description: string;

  @Prop({ required: true })
  readonly creator: Types.ObjectId;

  @Prop({ required: true })
  readonly epicId: string;

  @Prop({ default: Date.now })
  readonly createdAt: number;

  @Prop({ default: Date.now })
  readonly updatedAt: number;

  @Prop()
  readonly projectMember: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
