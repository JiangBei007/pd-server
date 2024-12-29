import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WrapResponseDecorator } from './../utils/wrapResponseDecorator';
import { AuthGuard } from './auth.guard';
import { Public } from './../jwt/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(`addUser`)
  @WrapResponseDecorator
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //@UseGuards(AuthGuard)
  @Get(`getUserList`)
  @WrapResponseDecorator
  findAll(
    @Query()
    query: {
      keyword: string;
      pagination: { currentPage: 1; pageSize: 10 };
    },
  ) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @WrapResponseDecorator
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @WrapResponseDecorator
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Public()
  @Post(`login`)
  @WrapResponseDecorator
  login(@Body() userDto: CreateUserDto) {
    return this.userService.login(userDto);
  }
}
