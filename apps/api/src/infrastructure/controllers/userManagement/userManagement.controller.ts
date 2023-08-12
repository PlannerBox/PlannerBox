import { Body, Controller, Get, HttpCode, Inject, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountManagementUseCases } from "../../../usecases/auth/accountManagement.usecases";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { JsonResult } from "../../helpers/JsonResult";
import { PermissionsGuard } from "../../common/guards/permissions.guard";
import { HasPermissions } from "../../decorators/has-permissions.decorator";
import { Role } from "../../../domain/models/enums/role.enum";
import { JwtAuthGuard } from "../../common/guards/jwtAuth.guard";
import UsersPermissions from "../../../domain/models/enums/usersPermissions.enum";
import { HasRole } from "../../decorators/has-role.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RolesPermissionsDto } from "./RolesPermissionsDto.class";

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

    @Get('is-active')
    @HttpCode(200)
    @ApiOperation({ description: 'check if a account is active' })
    async isValidAccount(@Query('username') username: string) {
        return await this.accountManagementUsecaseProxy.getInstance().accountIsValid(username);
    }

    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @Post('account-state')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'update account state' })
    async updateAccountState(@Query('username') username: string) {
        const response = await this.accountManagementUsecaseProxy.getInstance().updateAccountState(username);
        return JsonResult.Convert(`Account ${ !response ? 'de' : '' }activated`);
    }

    @Post('role-permissions')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'update roles permissions' })
    async updateRolePermissions(@Body() rolesPermissions: RolesPermissionsDto[], @Req() request: any) {
        rolesPermissions.forEach(async rolePermission => {
            await this.accountManagementUsecaseProxy.getInstance().updateRolePermissions(rolePermission.role, rolePermission.permissions);
        });
        return JsonResult.Convert(`Role permissions updated`);
    }
}