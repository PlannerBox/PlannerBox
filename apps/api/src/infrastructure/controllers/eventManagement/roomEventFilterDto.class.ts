import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class RoomEventFilterDto {
    @ApiProperty({ required: false, name: 'materials', description: 'required materials' })
    materials: UUID[];

    @ApiProperty({ required: false, name: 'startDate', description: 'event start date' })
    startDate: Date;

    @ApiProperty({ required: false, name: 'endDate', description: 'event end date' })
    endDate: Date;
}