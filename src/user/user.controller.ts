import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createProjectDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createProjectDto);

      if (user) {
        user.password = undefined;
      }

      return user;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Unable to create user`,
          error: 'Internal server error',
          details: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
