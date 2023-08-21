import { Body, Controller, Get, HttpCode, Inject, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
import { UserAccountWithoutPasswordDto } from "./userAccountDto.class";
import { UpdateAccountUseCase } from "../../../usecases/account/updateAccount.usecase";

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
        @Inject(UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY)
        private readonly updateAccountUseCase: UseCaseProxy<UpdateAccountUseCase>,
    ) 
    {}

    @Get('is-active')
    @HttpCode(200)
    @ApiOperation({ description: 'check if a account is active' })
    async isValidAccount(@Query('username') username: string) {
        return await this.accountManagementUsecaseProxy.getInstance().accountIsValid(username);
    }

    @Post('update')
    @ApiBody({ type: UserAccountWithoutPasswordDto })
    @ApiOperation({ description: 'update' })
    @HttpCode(200)
    async updateAccount(@Body() userAccount: UserAccountWithoutPasswordDto, @Req() request: any) {
        const AccountWithoutPassword = await this.updateAccountUseCase.getInstance().updateAccount(userAccount);
        return AccountWithoutPassword;
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

    @Get('role-permissions')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'get roles permissions of the connected user' })
    async getRolePermissions(@Req() request: any) {
        return await this.accountManagementUsecaseProxy.getInstance().getRolePermissions(request.user.role);
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

    @Get('users')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'get all users' })
    async getAllUsers() {
        return await this.accountManagementUsecaseProxy.getInstance().getAllAccounts();
    }
}