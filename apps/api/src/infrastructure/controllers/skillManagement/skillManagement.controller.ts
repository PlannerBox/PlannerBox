import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post } from "@nestjs/common";
import { CreateSkillUseCase } from "../../../usecases/skill/createSkill.usecase";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../usecases-proxy/usecases-proxy.module";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkillDto } from "./skillDto.class";
import { Paginate, PaginateQuery, Paginated } from "nestjs-paginate";

@Controller('skill-management')
@ApiTags('skill-management')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
export class SkillManagementController {
    constructor(
        @Inject(UsecasesProxyModule.CREATE_SKILL_USECASES_PROXY)
        private readonly createSkillUseCase: UseCaseProxy<CreateSkillUseCase>,
    ) {}

    @Get('skill/all')
    @ApiResponse({ status: 200, description: 'Get paginated list of all skills (with nestjs paginate)' })
    @ApiResponse({ status: 204, description: '0 skills found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getAllSkills(@Paginate() query: PaginateQuery): Promise<Paginated<SkillDto>> {
        return await this.createSkillUseCase.getInstance().getAllSkills(query);
    }

    @Post('skill/create')
    @ApiResponse({ status: 200, description: 'Skill created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: SkillDto })
    async createSkill(@Body() skill: SkillDto): Promise<any> {
        return await this.createSkillUseCase.getInstance().createSkill(skill);
    }

    @Post('skill/update')
    @ApiResponse({ status: 200, description: 'Skill updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    @ApiBody({ type: SkillDto })
    async updateSkill(@Body() skill: SkillDto): Promise<any> {
        return await this.createSkillUseCase.getInstance().updateSkill(skill);
    }

    @Delete('skill/delete/:skillId')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Skill deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    async deleteSkill(@Param('skillId') skillId: string): Promise<any> {
        return await this.createSkillUseCase.getInstance().deleteSkill(skillId);
    }
}