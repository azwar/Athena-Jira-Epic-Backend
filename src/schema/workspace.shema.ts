import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema()
export class Workspace {
  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ maxlength: 500 })
  readonly description: string;

  @Prop({ required: true })
  readonly creator: Types.ObjectId;

  @Prop({ default: Date.now })
  readonly createdAt: number;

  @Prop({ default: Date.now })
  readonly updatedAt: number;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
