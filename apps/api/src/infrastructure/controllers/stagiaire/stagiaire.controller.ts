import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StagiaireM } from '../../../domain/models/stagiaire';
import { GetStagiairesUseCases } from '../../../usecases/stagiaires/getStagiaires.usecase';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { StagiairePresenter } from './stagiaire.presenter';

@Controller('stagiaire')
@ApiTags('stagiaire')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(StagiairePresenter)
export class StagiaireController {
  constructor(
    //injection des usesCaseProxy ? ou services
    @Inject(UsecasesProxyModule.GET_STAGIAIRES_USECASES_PROXY)
    private readonly getStagiaireUseCaseProxy: UseCaseProxy<GetStagiairesUseCases>,
  ) {}

  @Get('all')
  @ApiResponseType(StagiairePresenter, true)
  async getStagiaires() {
    const todos = await this.getStagiaireUseCaseProxy.getInstance().execute();

    return todos.map((todo: StagiaireM) => new StagiairePresenter(todo));
  }
}
