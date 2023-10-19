import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { UpsertSkillUseCase } from "../../../usecases/skill/upsertSkill.usecase";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkillDto } from "./skillDto.class";
import { Paginate, PaginateQuery, Paginated } from "nestjs-paginate";
import { FindSkillUseCase } from "../../../usecases/skill/findSkill.usecase";
import { DeleteSkillUseCase } from "../../../usecases/skill/deleteSkill.usecase";
import { PlanningSessionDto } from "./planningSessionDto.class";
import { PlanTrainingUseCase } from "../../../usecases/skill/planTraining.usecase";
import { TeacherSkillsDto } from "./teacherSkillsDto";
import { LinkSkillToTeacherUseCase } from "../../../usecases/skill/linkSkillToTeacher.usecase";

@Controller('skill-management')
@ApiTags('skill-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class SkillManagementController {
    constructor(
        @Inject(UsecasesProxyModule.UPSERT_SKILL_USECASES_PROXY)
        private readonly createSkillUseCase: UseCaseProxy<UpsertSkillUseCase>,
        @Inject(UsecasesProxyModule.FIND_SKILL_USECASES_PROXY)
        private readonly findSkillUseCase: UseCaseProxy<FindSkillUseCase>,
        @Inject(UsecasesProxyModule.DELETE_SKILL_USECASES_PROXY)
        private readonly deleteSkillUseCase: UseCaseProxy<DeleteSkillUseCase>,
        @Inject(UsecasesProxyModule.PLAN_TRAINING_USECASES_PROXY)
        private readonly planTrainingUseCase: UseCaseProxy<PlanTrainingUseCase>,
        @Inject(UsecasesProxyModule.LINK_SKILL_TO_TEACHER_USECASES_PROXY)
        private readonly linkSkillToTeacherUseCase: UseCaseProxy<LinkSkillToTeacherUseCase>
    ) {}

    @Get('skill/all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: 'Get paginated list of all skills (with nestjs paginate)' })
    @ApiResponse({ status: 200, description: 'Get paginated list of all skills (with nestjs paginate)' })
    @ApiResponse({ status: 204, description: '0 skills found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getAllSkills(@Paginate() query: PaginateQuery): Promise<Paginated<SkillDto>> {
        return await this.findSkillUseCase.getInstance().getAllSkills(query);
    }

    @Post('skill/create')
    @HttpCode(200)
    @ApiOperation({ description: 'Create a new skill' })
    @ApiResponse({ status: 200, description: 'Skill created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: SkillDto })
    async createSkill(@Body() skill: SkillDto): Promise<any> {
        return await this.createSkillUseCase.getInstance().createSkill(skill);
    }

    @Post('skill/update')
    @HttpCode(200)
    @ApiOperation({ description: 'Update an existing skill' })
    @ApiResponse({ status: 200, description: 'Skill updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    @ApiBody({ type: SkillDto })
    async updateSkill(@Body() skill: SkillDto): Promise<any> {
        return await this.createSkillUseCase.getInstance().updateSkill(skill);
    }

    // déplacer dans controller eventScheduler
    @Post('skill/training/add')
    @HttpCode(200)
    @ApiOperation({ description: 'Plan a training session (will be moved soon !!!)' })
    @ApiResponse({ status: 200, description: 'Training successfully planned' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill or teacher not found' })
    @ApiBody({ type: PlanningSessionDto })
    async addTrainingSession(@Body() planningSession: PlanningSessionDto): Promise<any> {
        return await this.planTrainingUseCase.getInstance().planTraining(planningSession);
    }    

    @Post('skill/teacher/update')
    @HttpCode(200)
    @ApiOperation({ description: 'Associate skills to a teacher' })
    @ApiResponse({ status: 200, description: 'Teacher skill succesfully updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill or teacher not found' })
    @ApiBody({ type: TeacherSkillsDto })
    async associateSkillToTeacher(@Body() teacherSkills: TeacherSkillsDto): Promise<any> {
        return await this.linkSkillToTeacherUseCase.getInstance().addTeacherSkills(teacherSkills);
    }

    @Delete('skill/delete/:skillId')
    @HttpCode(204)
    @ApiOperation({ description: 'Delete an existing skill' })
    @ApiResponse({ status: 204, description: 'Skill deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    async deleteSkill(@Param('skillId') skillId: string): Promise<any> {
        return await this.deleteSkillUseCase.getInstance().deleteSkill(skillId);
    }
}