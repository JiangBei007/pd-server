import { PartialType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateModelDto) {}
