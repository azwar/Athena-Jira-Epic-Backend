import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create_user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../schema/user.shema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const createdData = new this.userModel(createUserDto);
    return createdData.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
