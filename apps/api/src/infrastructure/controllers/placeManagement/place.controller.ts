import {
    BadRequestException,
    Body,
    Controller,
    Delete,
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
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { HasPermissions } from '../../decorators/has-permissions.decorator';
import UsersPermissions from '../../../domain/models/enums/usersPermissions.enum';
import { PlaceDto } from './placeDto.class';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { PlaceUseCase } from '../../../usecases/place/place.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { RoomUseCase } from '../../../usecases/room/room.usecase';
import Role from '../../../domain/models/enums/role.enum';
import { HasRole } from '../../decorators/has-role.decorator';
import { PlaceM } from '../../../domain/models/place';
  
  @Controller('place')
  @ApiTags('place')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class PlaceController {
    constructor(
      @Inject(UsecasesProxyModule.PLACE_MANAGEMENT_PROXY)
      private readonly placeUseCaseProxy: UseCaseProxy<PlaceUseCase>,
      @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
      private readonly roomUsecaseProxy: UseCaseProxy<RoomUseCase>,
    ) {}
  
    @Post('insert')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: PlaceDto })
    @ApiOperation({ description: 'insert' })
    async insertPlace(@Body() place: PlaceDto, @Req() request: any) {
        await this.placeUseCaseProxy.getInstance().insertPlace(place);
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'delete' })
    async deletePlace(@Query('id') id: string) {
      await this.placeUseCaseProxy.getInstance().deletePlace(id);
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getOne' })
    async getPlace(@Query('id') id: string) : Promise<PlaceM>{
      return await this.placeUseCaseProxy.getInstance().getPlace(id);
    }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getAll' })
    async getAllPlace() : Promise<PlaceM[]> {
      return await this.placeUseCaseProxy.getInstance().getAllPlace();
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: PlaceDto })
    @ApiOperation({ description: 'update' })
    async updatePlace(@Body() place: PlaceM, @Req() request: any) {
      await this.placeUseCaseProxy.getInstance().updatePlace(place);
    }
   
  }
  