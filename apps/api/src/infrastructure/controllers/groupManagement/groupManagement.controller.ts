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
import { GroupDto, NewGroupDto } from "./groupDto.class";
import { CreateGroupUseCase } from "../../../usecases/group/createGroup.usecase";
import { UpdateGroupUseCase } from "../../../usecases/group/updateGroup.usecase";
import { JsonResult } from "../../helpers/JsonResult";

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

        @Inject(UsecasesProxyModule.UPDATE_GROUP_USECASES_PROXY)
        private readonly updateGroupUseCase: UseCaseProxy<UpdateGroupUseCase>,
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

        return GroupMapper.fromModelToDetailDto(group);
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
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Group successfully created',
    })
    async createGroup(@Body() newGroupDto: NewGroupDto): Promise<any> {
        await this.createGroupUseCase.getInstance().createGroup(newGroupDto);
        return JsonResult.Convert('Group successfully created');
    }

    @Post('group/update')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Group successfully updated',
    })
    @ApiResponse({
        status: 404,
        description: 'Group not found',
    })
    async updateGroup(@Body() groupDto: GroupDto): Promise<any> {
        await this.updateGroupUseCase.getInstance().updateGroup(groupDto);
        return JsonResult.Convert('Group successfully updated');
    }
}