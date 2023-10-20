import { Controller, Post, HttpCode, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from "@nestjs/swagger";
import { PlanningSessionDto } from "../skillManagement/planningSessionDto.class";
import { PlanTrainingUseCase } from "../../../usecases/skill/planTraining.usecase";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";

@Controller('schedule-management')
@ApiTags('schedule-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class ScheduleManagementController {
    constructor(
        @Inject(UsecasesProxyModule.PLAN_TRAINING_USECASES_PROXY)
        private readonly planTrainingUseCase: UseCaseProxy<PlanTrainingUseCase>,
    ) {}

    @Post('training/add')
    @HttpCode(200)
    @ApiOperation({ description: 'Plan a training session (will be moved soon !!!)' })
    @ApiResponse({ status: 200, description: 'Training successfully planned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill or teacher not found' })
    @ApiBody({ type: PlanningSessionDto })
    async addTrainingSession(@Body() planningSession: PlanningSessionDto): Promise<any> {
        return await this.planTrainingUseCase.getInstance().planTraining(planningSession);
    } 
}