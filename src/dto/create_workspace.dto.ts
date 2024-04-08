import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly creator: string;
}
