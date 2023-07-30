import { Controller, Get, HttpCode, Inject, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountManagementUseCases } from "../../../usecases/auth/accountManagement.usecases";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { JsonResult } from "../../helpers/JsonResult";

@Controller('user-management')
@ApiTags('user-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
export class UserManagementController {
    constructor(
        @Inject(UsecasesProxyModule.ACCOUNT_MANAGEMENT_USECASES_PROXY)
        private readonly accountManagementUsecaseProxy: UseCaseProxy<AccountManagementUseCases>,
    ) 
    {}

    @Get('is-valid')
    @HttpCode(200)
    @ApiOperation({ description: 'check if a account is valid' })
    async isValidAccount(@Query('username') username: string) {
        const response = await this.accountManagementUsecaseProxy.getInstance().accountIsValid(username);
        console.log(response)
        return response;
  }
}