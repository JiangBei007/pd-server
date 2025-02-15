import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      name: 'admin',
      password: '123456',
    },
    {
      userId: 2,
      name: 'JiangBei',
      password: 'pbszcqdgb',
    },
  ];
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}
  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.password = createUserDto.password;
    data.desc = createUserDto.desc;
    data.email = createUserDto.email;
    data.phone = createUserDto.phone;
    data.qq = createUserDto.qq;
    return this.user.save(data);
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
      const data = await this.user.find({
        where: {
          name: Like(`%${query?.keyword}%`),
        },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      });
      const total = await this.user.count({
        where: {
          name: Like(`%${query?.keyword || ''}%`),
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  checkStatus() {
    return 'Already logged in';
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
  async login(userDto: CreateUserDto) {
    const user = await this.user.findOne({
      where: { name: userDto.name, password: userDto.password },
    });
    console.log(82, user);
    // const user = this.users.find((item) => {
    //   return item.name === userDto.name && item.password === userDto.password;
    // });
    if (!user) {
      throw new BadRequestException('用户名或密码错误', { cause: new Error() });
    }

    const payload = { sub: user.id, username: user.name };
    return {
      //access_token
      token: await this.jwtService.signAsync(payload),
      userInfo: { ...user, password: undefined },
    };
  }
}
