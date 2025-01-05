import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateModelDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WrapResponseDecorator } from './../utils/wrapResponseDecorator';
import { Public } from './../jwt/utils';

@Controller('projectDesigner')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(`addProject`)
  @WrapResponseDecorator
  create(@Body() createUserDto: CreateModelDto) {
    return this.userService.create(createUserDto);
  }

  @Get(`getProjectList`)
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
  @Get(`getAllProject`)
  @WrapResponseDecorator
  findFull() {
    return this.userService.findFull();
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
  @Patch(':id/updateProjectJson')
  @WrapResponseDecorator
  updateModelJson(@Param('id') id: string, @Body() modelJson: any) {
    return this.userService.updateModelJson(+id, modelJson);
  }

  @Delete(':id')
  @WrapResponseDecorator
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
