import { Controller, Get, Inject } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StagiairePresenter } from "./stagiaire.presenter";
import { ApiResponseType } from "../../common/swagger/response.decorator";
import { StagiaireM } from "src/domain/models/stagiaire";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { GetStagiairesUseCases } from "src/usecases/stagiaires/getStagiaires.usecase";

@Controller('stagiaire')
@ApiTags('stagiaire')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(StagiairePresenter)
export class StagiaireController {
    constructor(
        //injection des usesCaseProxy ? ou services
        @Inject(UsecasesProxyModule.GET_STAGIAIRES_USECASES_PROXY)
        private readonly getStagiaireUseCaseProxy: UseCaseProxy<GetStagiairesUseCases>
      ) {}

      @Get('all')
      @ApiResponseType(StagiairePresenter, true)
      async getStagiaires() {
        const todos = await this.getStagiaireUseCaseProxy.getInstance().execute();
        
        return todos.map((todo: StagiaireM) => new StagiairePresenter(todo));
      }
}