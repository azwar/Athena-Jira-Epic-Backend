import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMilestoneDto {
  @IsNotEmpty()
  @IsString()
  project: Types.ObjectId;

  @IsString()
  @IsOptional() // signed automatically
  creator: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  assignee: Types.ObjectId;

  @IsNotEmpty()
  reporter: Types.ObjectId;

  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsOptional()
  attachment?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  storyPoint?: number;
}
