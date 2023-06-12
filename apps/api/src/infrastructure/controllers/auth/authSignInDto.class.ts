import { ApiProperty } from "@nestjs/swagger";

export class AuthSignInDto {
    @ApiProperty({ required: true })
    readonly username: string;

    @ApiProperty({ required: true })
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