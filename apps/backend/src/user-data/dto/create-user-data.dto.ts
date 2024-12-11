import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDataDto {
    @IsOptional()
    id: string;

    @IsArray()
    @IsString({each: true})
    @ArrayNotEmpty()
    favourite_cities: string[];
}
