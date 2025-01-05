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
import { Project } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Project) private readonly model: Repository<Project>,
    private jwtService: JwtService,
  ) {}
  create(createModelDto: CreateModelDto) {
    const data = new Project();
    console.log(22, createModelDto);
    data.name = createModelDto.name;
    data.desc = createModelDto.desc;
    return this.model.save(data);
  }

  async findAll(
    query: {
      keyword: string;
      pagination: { currentPage: number; pageSize: number };
    } = { keyword: '', pagination: { currentPage: 1, pageSize: 10 } },
  ) {
    const {
      pagination: { currentPage, pageSize } = { currentPage: 1, pageSize: 10 },
    } = query;
    try {
      const data = await this.model.find({
        where: {
          name: Like(`%${query?.keyword}%`),
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });
      const total = await this.model.count({
        where: {
          name: Like(`%${query?.keyword}%`),
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
  findOne(id: number) {
    return `This action returns a #${id} user`;
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

    item.projectDesignJson = modelJson;

    return this.model.save(item);
  }

  remove(id: number) {
    return this.model.delete(id);
  }
}
