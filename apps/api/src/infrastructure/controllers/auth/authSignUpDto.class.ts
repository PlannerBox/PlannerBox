import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class AuthPasswordDto {
    @ApiProperty({ required: true })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})(?!.*(.)\1{2,})/, {message: 'password too weak'})
    readonly password: string;
}

export class AuthSignUpDto extends AuthPasswordDto {
    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
    readonly firstname: string;
    
    @ApiProperty({ required: true })
    readonly lastname: string;
    
    @ApiProperty({ required: true })
    readonly birthDate: Date;

    @ApiProperty({ required: true })
    readonly birthPlace: string;
}