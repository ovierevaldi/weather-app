import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { DatabaseLogger } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, DatabaseLogger, PrismaService]
})
export class WeatherModule {}
