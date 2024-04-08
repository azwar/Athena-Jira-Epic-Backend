import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Milestone>;

@Schema()
export class Milestone {
  @Prop({ required: true })
  readonly project: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  readonly creator: Types.ObjectId;

  @Prop({ required: true })
  readonly assignee: Types.ObjectId;

  @Prop({ required: true })
  readonly reporter: Types.ObjectId;

  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ maxlength: 500, required: false })
  readonly description?: string;

  @Prop()
  readonly attachment?: string;

  @Prop({ required: true, default: 'todo' })
  readonly status: string;

  @Prop()
  readonly storyPoint: number;

  @Prop({ default: Date.now })
  readonly createdAt: number;

  @Prop({ default: Date.now })
  readonly updatedAt: number;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
