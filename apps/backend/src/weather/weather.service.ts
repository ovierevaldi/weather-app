import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { DatabaseLogger } from 'src/logger/logger.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly configService: ConfigService, private loggerService: DatabaseLogger)
  {}

  async findAll(city: string) {

    const url = `https://api.weatherapi.com/v1/current.json?key=${this.configService.get<string>('WEATHER_API_KEY')}&q=${city}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
        if(error.response.status === 400){
          throw new BadRequestException(error.response.data.error.message)          
        }
        else if(error.response.status === 401){
          this.logger.error(error.response.data.error.message);
          await this.loggerService.log(401, error.response.data.error.message)
        }

        else if(error.response.status === 403){
          this.logger.error(error.response.data.error.message);
          await this.loggerService.log(403, error.response.data.error.message)
        }
        throw new InternalServerErrorException('Cannot get weather data. Please contact admin');
    }
  }

  async getForecast(city: string, days: number) {
    const apiWeatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${this.configService.get<string>('WEATHER_API_KEY')}&q=${city}&days=${days}&aqi=no&alerts=no`;
    try {
      const response = await axios.get(apiWeatherURL);
      return response.data;
    } catch (error) {
      console.log(error);
      if(error.response.status === 400){
        throw new BadRequestException(error.response.data.error.message)          
      }
      
      else if(error.response.status === 401){
          this.logger.error(error.response.data.error.message);
      }
      else if(error.response.status === 403){
          this.logger.error(error.response.data.error.message);
          await this.loggerService.log(403, error.response.data.error.message)
      }
      throw new InternalServerErrorException('Cannot get Forecast Data. Please contact admin');
    }
  }
}
