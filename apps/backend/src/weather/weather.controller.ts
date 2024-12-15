import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  findAll(@Query('q') q: string) {
    return this.weatherService.findAll(q);
  }

  @Get('/forecast')
  getForecast(@Query('city') city: string, @Query('days') days: number) {
    return this.weatherService.getForecast(city, days);
  }
}
