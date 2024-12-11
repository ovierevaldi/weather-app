import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdateUserDatumDto } from './dto/update-user-data.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private prisma: PrismaService){}

  async create(createUserDataDto: CreateUserDataDto) {
    try {
      const user = await this.prisma.userData.create({
        data: {
          favourite_cities: createUserDataDto.favourite_cities
        }
      });
      return {message: 'Success Input Favourite Cities', user_id: user.id}
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  findAll() {
    return `This action returns all user Data`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDatum`;
  }

  update(id: number, updateUserDatumDto: UpdateUserDatumDto) {
    return `This action updates a #${id} userDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDatum`;
  }
}
