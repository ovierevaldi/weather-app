import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserDataController],
  providers: [UserDataService, PrismaService],
})
export class UserDataModule {}
