import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly workspaceId: Types.ObjectId;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @MaxLength(500)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly creator: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly epicId: string;

  readonly projectMember: Types.ObjectId[];
}
