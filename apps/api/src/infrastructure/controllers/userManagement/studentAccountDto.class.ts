import { ApiProperty } from "@nestjs/swagger";
import { FormationMode } from "../../../domain/models/enums/formationMode.enum";
import { UserAccountDto } from "./userAccountDto.class";
import { IsNotEmpty } from "class-validator";

export class StudentAccountDto extends UserAccountDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Student id can not be empty' })
    readonly studentId: string

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Formation mode can not be empty' })
    readonly formationMode: FormationMode;
}