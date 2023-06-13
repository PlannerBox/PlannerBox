import { Controller, Inject, Post, UseGuards, Body, Get, Req } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiExtraModels, ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/infrastructure/common/guards/jwtAuth.guard";
import JwtRefreshGuard from "src/infrastructure/common/guards/jwtRefresh.guard";
import { LoginGuard } from "src/infrastructure/common/guards/login.guard";
import { ApiResponseType } from "src/infrastructure/common/swagger/response.decorator";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { IsAuthenticatedUseCases } from "src/usecases/auth/isAuthenticated.usecases";
import { LoginUseCases } from "src/usecases/auth/login.usecases";
import { LogoutUseCases } from "src/usecases/auth/logout.usecases";
import { IsAuthPresenter } from "./auth.presenter";
import { AuthLoginDto } from "./authDto.class";
import { AuthSignInDto } from "./authSignInDto.class";
import { SignInUseCases } from "src/usecases/auth/signIn.usecases";

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
    @Inject(UsecasesProxyModule.SIGNIN_USECASES_PROXY)
    private readonly signInUsecaseProxy: UseCaseProxy<SignInUseCases>
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return 'Login successful';
  }

  @Post('signin')
  @ApiBody({ type: AuthSignInDto })
  @ApiOperation({ description: 'signin' })
  async signin(@Body() newAccount: AuthSignInDto, @Req() request: any) {
    const account = await this.signInUsecaseProxy.getInstance().signIn(newAccount);
    const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(account.username);
    const refreshTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtRefreshToken(account.username);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return 'Signin successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Req() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any) {
    const user = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
    const response = new IsAuthPresenter();
    response.username = user.username;
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
