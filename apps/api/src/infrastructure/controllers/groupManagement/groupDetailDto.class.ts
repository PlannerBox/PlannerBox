import { ApiProperty } from "@nestjs/swagger";
import { GroupMembersDto } from "./groupMembersDto.class";

export class GroupDetailDto {
    @ApiProperty({ type: String, description: 'Group id' })
    id?: string;
    
    @ApiProperty({ type: String, description: 'Group name' })
    name: string;

    @ApiProperty({ type: String, description: 'Group color' })
    color: string;

    @ApiProperty({ type: GroupMembersDto, description: 'Group members' })
    groupMembers: GroupMembersDto[];
}