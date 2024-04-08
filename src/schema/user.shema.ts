import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  id: string;

  @Prop({ required: true, maxlength: 50 })
  firstName: string;

  @Prop({ required: true, maxlength: 50 })
  lastName: string;

  @Prop({ required: true, unique: true, maxlength: 150 })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ maxlength: 200 })
  profilePic: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  readonly createdAt: number;

  @Prop({ default: Date.now })
  readonly updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
