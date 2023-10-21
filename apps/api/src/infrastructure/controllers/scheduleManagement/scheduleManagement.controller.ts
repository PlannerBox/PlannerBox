import { Controller, Post, HttpCode, Body, Inject, BadRequestException, NotImplementedException } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from "@nestjs/swagger";
import { EventDto } from "./eventDto.class";
import { PlanTrainingUseCase } from "../../../usecases/event/planTraining.usecase";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ScheduleEventDto } from "./scheduleEventDto.class";
import { PlanCourseUseCase } from "../../../usecases/event/planCourse.usecase";

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
        @Inject(UsecasesProxyModule.PLAN_COURSE_USECASES_PROXY)
        private readonly planCourseUseCase: UseCaseProxy<PlanCourseUseCase>
    ) {}

    @Post('event/create')
    @HttpCode(200)
    @ApiOperation({ description: 'Create a new course' })
    @ApiResponse({ status: 200, description: 'Course successfully planned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill or teacher not found' })
    @ApiBody({ type: ScheduleEventDto })
    async addTrainingSession(@Body() courses: ScheduleEventDto): Promise<any> {
        switch (courses.parent.eventType) {
            case 0:
                return await this.planCourseUseCase.getInstance().planCourse(courses);
            case 1:
            case 2:
                return await this.planTrainingUseCase.getInstance().planTraining(courses);
            default:
                throw new BadRequestException('courseType must be 0, 1 or 2');
        }
    } 
}