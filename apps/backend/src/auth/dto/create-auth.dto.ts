import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8, {
        message: 'Username must be at least 8 characters long',
    })
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {
        message: 'Password must be at least 8 characters long',
    })
    password: string
}
