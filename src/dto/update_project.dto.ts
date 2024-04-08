import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create_project.dto';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
