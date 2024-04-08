import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosError, AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { catchError, firstValueFrom, map } from 'rxjs';
import {
  BASE_URL_JIRA,
  SUB_URL_JIRA_EPIC_DETAILS,
  SUB_URL_JIRA_EPiC,
} from '../constants';
import { CreateProjectDto } from '../dto/create_project.dto';
import { IEpic } from '../interface/epic.interface';
import { Project } from '../schema/project.shema';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BEARER_TOKEN;

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly httpService: HttpService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const epic = await this.findJirasEpicById(createProjectDto.epicId);

    if (!epic) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Can not find Jiras Epic with ID: ${createProjectDto.epicId} `,
          error: 'Validation error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdData = new this.projectModel(createProjectDto);
    return createdData.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findAllByFilter(
    creatorId: string,
    workspaceId: string,
  ): Promise<Project[]> {
    return this.projectModel
      .find({
        $or: [{ creator: creatorId }, { workspaceId: workspaceId }],
      })
      .exec();
  }

  async findAllJirasEpic(): Promise<IEpic[]> {
    const url = BASE_URL_JIRA + SUB_URL_JIRA_EPiC;
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    };

    const data = await firstValueFrom(
      this.httpService.get<IEpic[]>(url, { headers: headersRequest }).pipe(
        map((response: AxiosResponse<any>) => {
          return response.data.issues.map((item) => {
            return {
              id: item.id,
              summary: item.fields.summary,
              description: item.fields.description,
              creator: {
                accountId: item.fields.creator.accountId,
                displayName: item.fields.creator.displayName,
              },
              created: item.fields.created,
              updated: item.fields.updated,
            };
          });
        }),
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: `Unable to get list Jiras Epic`,
              error: 'Validation error',
              details: error.response.data,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );

    return data;
  }

  async findJirasEpicById(id: string): Promise<IEpic> {
    const url = BASE_URL_JIRA + SUB_URL_JIRA_EPIC_DETAILS + id;
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    };

    const data = await firstValueFrom(
      this.httpService.get<IEpic>(url, { headers: headersRequest }).pipe(
        map((response: AxiosResponse<any>) => {
          const item = response.data;

          return {
            id: item.id,
            summary: item.fields.summary,
            description: item.fields.description,
            creator: {
              accountId: item.fields.creator.accountId,
              displayName: item.fields.creator.displayName,
            },
            created: item.fields.created,
            updated: item.fields.updated,
          };
        }),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          this.logger.error(error.response?.data);
          throw new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: `Unable to find Jiras Epic by ID: ${id}`,
              error: 'Validation error',
              details: error.response?.data,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );

    return data;
  }
}
