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
import { HasRole } from '../../decorators/has-role.decorator';
import Role from '../../../domain/models/enums/role.enum';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { RoomM } from '../../../domain/models/room';
import { MaterialUseCase } from '../../../usecases/material/material.usecase';
import { MaterialM } from '../../../domain/models/material';
import { MaterialDto } from './materialDto.class';
  
  @Controller('material')
  @ApiTags('material')
  @ApiResponse({
    status: 401,
    description: 'No authorization token was found',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  export class MaterialController {
    constructor(
      @Inject(UsecasesProxyModule.MATERIAL_MANAGEMENT_PROXY)
      private readonly materialUseCaseProxy: UseCaseProxy<MaterialUseCase>,
    ) {}
  
    @Post('insert')
    @HasPermissions(UsersPermissions.Add)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: MaterialDto })
    @ApiOperation({ description: 'insert' })
    async insertRoom(@Body() material: MaterialM) { 
      await this.materialUseCaseProxy.getInstance().insertMaterial(material);  
    }

    @Delete('delete')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Delete)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'delete' })
    async deleteRoom(@Query('id') id: string) {
      await this.materialUseCaseProxy.getInstance().deleteMaterial(id);
    }
    @Get('getOne')
    @HasPermissions(UsersPermissions.Read)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getOne' })
    async getPlace(@Query('id') id: string) : Promise<MaterialM>{
      return await this.materialUseCaseProxy.getInstance().getMaterial(id);
    }
    @Get('getAll')
    @HasPermissions(UsersPermissions.ReadAll)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiOperation({ description: 'getAll' })
    async getAllPlace() : Promise<MaterialM[]> {
      return await this.materialUseCaseProxy.getInstance().getAllMaterial();
    }
    @Post('update')
    @HasRole(Role.Admin)
    @HasPermissions(UsersPermissions.Update)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({ type: MaterialDto })
    @ApiOperation({ description: 'update' })
    async updatePlace(@Body() room: RoomM, @Req() request: any) {
      await this.materialUseCaseProxy.getInstance().updateMaterial(room);
    }
   
  }
  