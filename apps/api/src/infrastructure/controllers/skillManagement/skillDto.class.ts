import { ApiProperty } from "@nestjs/swagger";

export class SkillDto {
    @ApiProperty({ required: false, name: 'id' })
    id?: string;
    @ApiProperty({ required: true, name: 'name' })
    name: string;
}