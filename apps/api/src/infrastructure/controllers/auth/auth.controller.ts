import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
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
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { SignUpUseCases } from '../../../usecases/auth/signUp.usecases';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { LoginGuard } from '../../common/guards/login.guard';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { IsAuthPresenter } from './auth.presenter';
import { AuthLoginDto } from './authDto.class';
import { AuthPasswordDto, AuthSignUpDto } from './authSignUpDto.class';
import { ResetPasswordUseCases } from '../../../usecases/auth/resetPassword.usecases';
import { JsonResult } from '../../helpers/JsonResult';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
    @Inject(UsecasesProxyModule.SIGNUP_USECASES_PROXY)
    private readonly signUpUsecaseProxy: UseCaseProxy<SignUpUseCases>,
    @Inject(UsecasesProxyModule.RESET_PASSWORD_USECASES_PROXY)
    private readonly resetPasswordUsecaseProxy: UseCaseProxy<ResetPasswordUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      access_token: accessTokenCookie.replace('Authentication=', ''),
      refresh_token: refreshTokenCookie.replace('Refresh=', ''),
    };
  }

  @Post('signup')
  @ApiBody({ type: AuthSignUpDto })
  @ApiOperation({ description: 'signup' })
  async signup(@Body() newAccount: AuthSignUpDto, @Req() request: any) {
    const checkUserName = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(newAccount.username);
    if (checkUserName) {
      throw new BadRequestException('User already created');
    }
    const account = await this.signUpUsecaseProxy
      .getInstance()
      .signUp(newAccount);
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(account.username);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(account.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return JsonResult.Convert('Signup successful');
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Req() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return JsonResult.Convert('Logout successful');
  }

  @Get('is-authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy
      .getInstance()
      .execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      access_token: accessTokenCookie.replace('Authentication=', ''),
    };
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ description: 'request a password update' })
  async changePassword(@Query('mail') mail: string) {
    const user = await this.isAuthUsecaseProxy.getInstance().execute(mail);

    if (user) {
      await this.resetPasswordUsecaseProxy.getInstance().askResetPassword(mail);
    }

    // We don't specify if the mail exists or not to the user to avoid giving information to a potential attacker
    return JsonResult.Convert(
      `If your mail is correct you should recieve a mail at the address : ${mail}`,
    );
  }

  @Post('change-password/:token')
  @HttpCode(200)
  @ApiOperation({ description: 'change the password of an account' })
  async changePasswordWithToken(
    @Param('token') token: string,
    @Body() accountPassword: AuthPasswordDto,
  ) {
    const response = await this.resetPasswordUsecaseProxy
      .getInstance()
      .resetPassword(token, accountPassword.password);

    return JsonResult.Convert('the password has been changed');
  }

  @Get('is-valid/:token')
  @HttpCode(200)
  @ApiOperation({ description: 'check if a token is valid' })
  async isValidToken(@Param('token') token: string) {
    const response = await this.resetPasswordUsecaseProxy.getInstance().tokenIsValid(token);
    
    return response.statusCode ? response : JsonResult.Convert('The token is valid');

  }
}
