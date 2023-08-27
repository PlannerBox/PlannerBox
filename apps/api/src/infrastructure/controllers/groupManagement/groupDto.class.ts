import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class GroupDto {
    @ApiProperty({ type: String, description: 'Group id' })
    id?: string;

    @ApiProperty({ type: String, description: 'Group name' })
    name: string;

    @ApiProperty({ type: String, description: 'Group color' })
    color: string;
}

export class NewGroupMemberDto {
    @ApiProperty({ type: String, description: 'Account id' })
    accountId: string;

    @ApiProperty({ type: Boolean, description: 'Is owner' })
    isOwner: boolean;
}

export class NewGroupDto extends GroupDto{
    @ApiProperty({ type: NewGroupMemberDto, description: 'Group members' })
    @IsArray()
    groupMembers?: NewGroupMemberDto[];
}


