import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { UserDataModule } from './user-data/user-data.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), WeatherModule, UserDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
