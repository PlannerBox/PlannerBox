import { Controller, Get, HttpCode, Inject } from "@nestjs/common";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { GetGroupUseCase } from "../../../usecases/group/getGroup.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
    ) {}

    @Get('summary')
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


}