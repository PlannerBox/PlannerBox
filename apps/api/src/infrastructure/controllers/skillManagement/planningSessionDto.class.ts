import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsUUID } from "class-validator";
import { UUID } from "crypto";
import CourseType from "../../../domain/models/enums/courseType.enum";

export class PlanningSessionDto {
    @ApiProperty({ required: false, name: 'id' })
    id?: UUID;

    @ApiProperty({ required: true, name: 'skillIds', type: [String] })
    @IsUUID('4', { each: true, message: 'skillIds doit être un tableau de UUIDs' })
    skillIds: UUID[];

    @ApiProperty({ required: true, name: 'teacherIds', type: [String] })
    @IsUUID('4', { each: true, message: 'teacherAccountIds doit être un tableau de UUIDs' })
    teacherAccountIds: UUID[];

    @ApiProperty({ required: true, name: 'startDate' })
    @IsDateString({}, { message: 'startDate doit être une date' })
    startDate: Date;

    @ApiProperty({ required: true, name: 'endDate' })
    @IsDateString({}, { message: 'endDate doit être une date' })
    endDate: Date;

    @ApiProperty({ required: true, name: 'courseType' })
    courseType: CourseType;
}