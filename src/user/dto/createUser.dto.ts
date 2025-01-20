import {
    IsAlpha,
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(3)
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MinLength(6)
    @MaxLength(15)
    @IsAlpha()
    @IsNotEmpty()
    password: string;
}
