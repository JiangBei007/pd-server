import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateModelDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkRecord } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WorkRecord)
    private readonly model: Repository<WorkRecord>,
    private jwtService: JwtService,
  ) {}
  create(createModelDto: CreateModelDto) {
    const data = new WorkRecord();
    data.projectId = createModelDto.projectId;
    data.model = createModelDto.model;
    return this.model.save(data);
  }

  async findAll(
    query: {
      keyword?: string;
      projectId?: number;
      pagination: { currentPage: number; pageSize: number };
    } = {
      keyword: '',
      projectId: undefined,
      pagination: { currentPage: 1, pageSize: 10 },
    },
  ) {
    const {
      projectId,
      pagination: { currentPage, pageSize } = { currentPage: 1, pageSize: 10 },
    } = query;
    try {
      const data = await this.model.find({
        where: {
          projectId,
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });
      const total = await this.model.count({
        where: {
          projectId,
        },
      });
      return {
        data,
        total,
      };
    } catch (error) {
      console.log(47, error);
    }
  }
  async findFull() {
    const data = await this.model.find();

    return data;
  }
  async findOne(id: number) {
    const entity = await this.model.findOneBy({ id });
    if (!entity) {
      return { message: 'Entity not found' };
    }
    return entity;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.model.update(id, updateUserDto);
  }
  async updateModelJson(id: number, modelJson: any) {
    const item = await this.model.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    item.model = modelJson;
    return this.model.save(item);
  }

  remove(id: number) {
    return this.model.delete(id);
  }
}
