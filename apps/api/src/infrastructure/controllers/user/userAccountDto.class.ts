import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class UserAccountWithoutPasswordDto {
    @ApiProperty({ required: true })
    readonly id: string;

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

    @ApiProperty({ default: true })
    readonly active: boolean;
}

export class UserAccountDto extends UserAccountWithoutPasswordDto {
    @ApiProperty({ required: true })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})(?!.*(.)\1{2,})/, {message: 'password too weak'})
    readonly password: string;
}