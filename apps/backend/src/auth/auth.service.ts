import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async login(createAuthDto: CreateAuthDto){
    try {
      const user = await this.prisma.userData.findUnique({
        where: {
          username: createAuthDto.username
        }
      });
      if(!user){
        throw new NotFoundException('Username or Password is Wrong');
      }

      if(user.password === createAuthDto.password)
        return {message: "can login", payload: {id: user.id, username: user.username}}
      else{
        throw new UnauthorizedException('Username or Password is Wrong')
      }
    } catch (error) {
      console.log(error);

      if(error.status === 404){
        throw new NotFoundException([error.message])
      };

      if(error.status === 401){
        throw new UnauthorizedException([error.message])
      };

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
