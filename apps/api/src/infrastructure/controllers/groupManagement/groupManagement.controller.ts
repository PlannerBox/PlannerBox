import { Body, Controller, Get, HttpCode, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { GetGroupUseCase } from "../../../usecases/group/getGroup.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GroupDetailDto } from "./groupDetailDto.class";
import { GroupMapper } from "../../mappers/group.mapper";
import { JwtAuthGuard } from "../../common/guards/jwtAuth.guard";
import { AccountMapper } from "../../mappers/account.mapper";
import { NestedAccountDto } from "./nestedAccountDto.class";
import { AddMemberUseCase } from "../../../usecases/group/addMember.usecase";
import { NewGroupDto } from "./newGroupDto.class";
import { CreateGroupUseCase } from "../../../usecases/group/createGroup.usecase";

@Controller('group-management')
@ApiTags('group-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class GroupManagementController {
    constructor(
        @Inject(UsecasesProxyModule.GET_GROUP_USECASES_PROXY)
        private readonly getGroupUsecasesProxy: UseCaseProxy<GetGroupUseCase>,

        @Inject(UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY)
        private readonly addMemberUseCase: UseCaseProxy<AddMemberUseCase>,

        @Inject(UsecasesProxyModule.CREATE_GROUP_USECASES_PROXY)
        private readonly createGroupUseCase: UseCaseProxy<CreateGroupUseCase>,
    ) {}

    @Get('group/summary')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns a summary of all groups',
    })
    @ApiResponse({
        status: 404,
        description: 'No group found',
    })

    @ApiOperation({ description: 'Returns a summary of all groups' })
    async getGroupSummaryList() {
        return await this.getGroupUsecasesProxy.getInstance().findGroupList();
    }


    @Get('group/:groupId/details')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns details of a group',
        type: GroupDetailDto
    })
    @ApiResponse({
        status: 404,
        description: 'No group found',
    })
    @ApiOperation({ description: 'Returns details of a group' })
    async getGroupDetails(@Param('groupId') groupId: string): Promise<GroupDetailDto> {
        const group = await this.getGroupUsecasesProxy.getInstance().findGroupDetails(groupId);

        return GroupMapper.fromModelToDto(group);
    }

    @Get('user/summary')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Returns a summary list of all users',
        type: NestedAccountDto,
    })
    @ApiResponse({
        status: 404,
        description: 'No user found',
    })
    @ApiOperation({ description: 'Get the summary of all users' })
    async getAllUsersSummary(): Promise<NestedAccountDto[]> {
        const accounts = await this.addMemberUseCase.getInstance().getAllSummaryAccounts();

        return accounts.map(account => {
            return AccountMapper.fromNestedModelToNestedDto(account);
        });
    }

    @Post('group/create')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async createGroup(@Body() NewGroupDto: NewGroupDto) {
        const newGroup = await this.createGroupUseCase.getInstance().createGroup(NewGroupDto);

        return newGroup;
    }
}