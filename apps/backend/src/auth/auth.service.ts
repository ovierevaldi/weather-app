import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService){}
  async create(createAuthDto: CreateAuthDto) {
    try {
      await this.prisma.userData.create({
        data: {
          username: createAuthDto.username,
          password: createAuthDto.password,
          favourite_cities: []
        }
      });
      return {message: 'Success Create User'}
    } catch (error) {
      console.log(error);
      if(error.code === 'P2002'){
        throw new BadRequestException(['Username already exsist'])
      }
      throw new InternalServerErrorException()
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
