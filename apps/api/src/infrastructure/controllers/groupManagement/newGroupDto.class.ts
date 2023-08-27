import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class NewGroupMemberDto {
    @ApiProperty({ type: String, description: 'Account id' })
    accountId: string;

    @ApiProperty({ type: Boolean, description: 'Is owner' })
    isOwner: boolean;
}

export class NewGroupDto {
    @ApiProperty({ type: String, description: 'Group name' })
    name: string;

    @ApiProperty({ type: String, description: 'Group color' })
    color: string;

    @ApiProperty({ type: NewGroupMemberDto, description: 'Group members' })
    @IsArray()
    groupMembers?: NewGroupMemberDto[];
}
