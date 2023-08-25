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

    @Get('group-list')
    @HttpCode(200)
    @ApiOperation({ description: 'Get a list of all groups' })
    async getGroupList() {
        return await this.getGroupUsecasesProxy.getInstance().findGroupList();
    }
}