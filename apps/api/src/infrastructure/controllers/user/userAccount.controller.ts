import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { LoginGuard } from '../../common/guards/login.guard';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UserAccountDto, UserAccountWithoutPasswordDto } from './userAccountDto.class';
import { UpdateAccountUseCase } from '../../../usecases/account/updateAccount.usecase';


@Controller('userAccount')
@ApiTags('userAccount')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class UserAccountController {
  constructor(
    @Inject(UsecasesProxyModule.UPDATE_USER_ACCOUNT_PROXY)
    private readonly updateAccountUseCase: UseCaseProxy<UpdateAccountUseCase>,
  ) {}


  @Post('update')
  @ApiBody({ type: UserAccountWithoutPasswordDto })
  @ApiOperation({ description: 'update' })
  @HttpCode(200)
  async updateAccount(@Body() userAccount: UserAccountWithoutPasswordDto, @Req() request: any) {
    const AccountWithoutPassword=await this.updateAccountUseCase.
      getInstance().updateAccount(userAccount);
      return AccountWithoutPassword;
  }
}
