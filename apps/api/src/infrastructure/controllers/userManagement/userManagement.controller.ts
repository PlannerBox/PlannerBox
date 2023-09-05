import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
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
import { GenericUserAccountDto } from "./userAccountDto.class";
import { UpdateAccountUseCase } from "../../../usecases/account/updateAccount.usecase";
import { StudentAccountDto } from "./studentAccountDto.class";
import { Paginate, PaginateQuery } from "nestjs-paginate";

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
    @ApiOperation({ description: 'check if the given account is active' })
    async isValidAccount(@Query('username') username: string) {
        return await this.accountManagementUsecaseProxy.getInstance().accountIsValid(username);
    }

    @Post('update')
    @HasPermissions(UsersPermissions.UpdateAll, UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: GenericUserAccountDto })
    @ApiOperation({ description: 'update user account' })
    @HttpCode(200)
    async updateAccount(@Body() userAccount: GenericUserAccountDto, @Req() request: any) {
        let AccountWithoutPassword;
        if(request.user.permissions.some(permission=>{return UsersPermissions.UpdateAll==permission})){

            AccountWithoutPassword = await this.updateAccountUseCase.getInstance().updateAccount(userAccount);
        }
        else if (request.user.id==userAccount.id) {
            AccountWithoutPassword = await this.updateAccountUseCase.getInstance().updateAccount(userAccount);
        }
        else
        {
            return new UnauthorizedException("Impossible de modifier cet utilisateur.");
        }
        
        return AccountWithoutPassword;
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @HttpCode(200)
    @ApiOperation({ description: 'delete an inactive account' })
    async deleteAccount(@Query('id') id: string) {
        await this.accountManagementUsecaseProxy.getInstance().deleteAccount(id);
        return JsonResult.Convert('Account delete');
    }
    
    @HasPermissions(UsersPermissions.UpdateAll, UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Post('/student/update')
    @ApiOperation({ description: 'update a student account (not really usefull, prefer user-management/update route)' })
    @HttpCode(200)
    async updateStudentAccount(@Body() studentAccount: StudentAccountDto, @Req() request: any) {
        const AccountWithoutPassword = await this.updateAccountUseCase.getInstance().updateStudentAccount(studentAccount);
        return AccountWithoutPassword;
    }

    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @Post('account-state')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'invert account state' })
    async updateAccountState(@Query('username') username: string) {
        const response = await this.accountManagementUsecaseProxy.getInstance().updateAccountState(username);
        return JsonResult.Convert(`Account ${ !response ? 'de' : '' }activated`);
    }

    @Get('role-permissions')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'get role permissions of the connected user' })
    async getRolePermissions(@Req() request: any) {
        return await this.accountManagementUsecaseProxy.getInstance().getRolePermissions(request.user.role);
    }
    
    @Post('role-permissions')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'update permissions for given roles' })
    async updateRolePermissions(@Body() rolesPermissions: RolesPermissionsDto[], @Req() request: any) {
        rolesPermissions.forEach(async rolePermission => {
            await this.accountManagementUsecaseProxy.getInstance().updateRolePermissions(rolePermission.role, rolePermission.permissions);
        });
        return JsonResult.Convert(`Role permissions updated`);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'get all users (0 filter 0 pagination at the moment)' })
    async getAllUsers(@Paginate() query: PaginateQuery): Promise<any> {
        return await this.accountManagementUsecaseProxy.getInstance().findAll(query);
    }

    @Get('users/details')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ description: 'get user details' })
    async getUserDetails(@Query('id') id: string, @Query('username') username: string, @Query('firstname') firstname: string, @Query('lastname') lastname: string) {
        return await this.accountManagementUsecaseProxy.getInstance().findAccountDetails(id, username, firstname, lastname);
    }
}