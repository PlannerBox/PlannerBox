import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class AuthSignUpDto {
    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {message: 'password too weak'})
    readonly password: string;

    @ApiProperty({ required: true })
    readonly firstname: string;
    
    @ApiProperty({ required: true })
    readonly lastname: string;
    
    @ApiProperty({ required: true })
    readonly email: string;

    @ApiProperty({ required: true })
    readonly birthDate: Date;

    @ApiProperty({ required: true })
    readonly birthPlace: string;
}