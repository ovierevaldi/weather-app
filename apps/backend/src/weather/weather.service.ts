import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {

  constructor(private readonly configService: ConfigService){}

  create(createWeatherDto: CreateWeatherDto) {
    return 'This action adds a new weather';
  }

  async findAll(city: string = 'Jakarta') {

    const url = `https://api.weatherapi.com/v1/current.json?key=${this.configService.get<string>('WEATHER_API_KEY')}&q=${city}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Cannot Get Weather Data')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
