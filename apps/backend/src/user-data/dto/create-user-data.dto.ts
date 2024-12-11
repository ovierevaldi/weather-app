import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDataDto {
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    city: string;
    
    @IsBoolean()
    @IsNotEmpty()
    value: boolean;
}
