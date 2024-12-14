import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private prisma: PrismaService){}

  async create(createUserDataDto: CreateUserDataDto) {
    try {
      const user = await this.prisma.userData.create({
        data: {
          favourite_cities: [createUserDataDto.city]
        }
      });
      return {message: 'Success Input Favourite Cities', data: {user_id: user.id}}
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Cannot Create New User. Please contact admin')
    }
  }

  async findOne(id: string) {
    try {
      const userData = await this.prisma.userData.findUnique({
        where: {
          id: id
        }
      });
      
      if(!userData){
        throw new NotFoundException('User Not Found')
      };

      return userData;
    } catch (error) {
      if(error.status === 404){
        throw error;
      }
      else
        throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateUserDataDto: UpdateUserDataDto) {
    try {
      const userData = await this.prisma.userData.findFirst({
        where: {id: id}
      });

      if(!userData)
        throw new NotFoundException('User Not Found');

      // Append
      if(updateUserDataDto.value === true){
        if(userData.favourite_cities.indexOf(updateUserDataDto.city) > -1)
          throw new BadRequestException ({message: 'Requested City Already A Favourite', code: 101});

        userData.favourite_cities.push(updateUserDataDto.city);
      }

      // Remove City
      else{
        const index = userData.favourite_cities.indexOf(updateUserDataDto.city);
        if(index > -1)
          userData.favourite_cities.splice(index, 1);
        else{
          throw new BadRequestException({message: 'Requested City Not Found', code: 102})
        }
      }

      await this.prisma.userData.update({
        where: {
          id: userData.id
        },
        data: {favourite_cities: userData.favourite_cities}
      });

      return updateUserDataDto.value === true ? {message: 'Success Update User Favourite City', value: 'add'} : {message: 'Success Remove User Favourite City', value: 'remove'}

    } catch (error) {
      if(error.status === 404){
        throw error;
      }

      if(error.status === 400){
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
