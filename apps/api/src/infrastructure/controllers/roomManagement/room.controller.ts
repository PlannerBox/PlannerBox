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
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RoomDto } from './roomDto.class';
import { HasRole } from '../../decorators/has-role.decorator';
import Role from '../../../domain/models/enums/role.enum';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { PlaceUseCase } from '../../../usecases/place/place.usecase';
import { RoomM } from '../../../domain/models/room';
import { RoomUseCase } from '../../../usecases/room/room.usecase';
import { json } from 'stream/consumers';
import { JsonResult } from '../../helpers/JsonResult';
  
  @Controller('room')
  @ApiTags('room')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class RoomController {
    constructor(
      @Inject(UsecasesProxyModule.PLACE_MANAGEMENT_PROXY)
      private readonly placeUseCaseProxy: UseCaseProxy<PlaceUseCase>,
      @Inject(UsecasesProxyModule.ROOM_MANAGEMENT_PROXY)
      private readonly roomUseCaseProxy: UseCaseProxy<RoomUseCase>,
    ) {}
  
    @Post('insert/:idPlace')
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: RoomDto })
    @ApiOperation({ description: 'insert' })
    async insertRoom(@Body() room: RoomM, @Param('idPlace') idPlace: string) { 
      await this.roomUseCaseProxy.getInstance().insertRoom(room, idPlace); 
      return JsonResult.Convert("Room successfully added"); 
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'delete' })
    async deleteRoom(@Query('id') id: string) {
      await this.roomUseCaseProxy.getInstance().deleteRoom(id);
      return JsonResult.Convert("Room successfully removed");
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getOne' })
    async getPlace(@Query('id') id: string) : Promise<RoomM>{
      return await this.roomUseCaseProxy.getInstance().getRoom(id);
    }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getAll' })
    async getAllPlace() : Promise<RoomM[]> {
      return await this.roomUseCaseProxy.getInstance().getAllRoom();
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: RoomDto })
    @ApiOperation({ description: 'update' })
    async updatePlace(@Body() room: RoomM, @Req() request: any) {
      await this.roomUseCaseProxy.getInstance().updateRoom(room);
      return JsonResult.Convert("Room successfully updated");
    }
   
  }
  