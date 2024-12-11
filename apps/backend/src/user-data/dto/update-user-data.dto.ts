import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDataDto } from './create-user-data.dto';

export class UpdateUserDatumDto extends PartialType(CreateUserDataDto) {}
