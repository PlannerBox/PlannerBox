import { ILogger } from "../../domain/logger/logger.interface";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { SkillDto } from "../../infrastructure/controllers/skillManagement/skillDto.class";
import { SkillMapper } from "../../infrastructure/mappers/skill.mapper";

export class CreateSkillUseCase {
    constructor(
        private readonly skillRepository: ISkillRepository,
        private readonly logger: ILogger
    ) {}

    async createSkill(skill: SkillDto): Promise<any> {
        const newSkill = SkillMapper.toDomain(skill);
        
        await this.skillRepository.createSkill(newSkill);

        this.logger.log('CreateSkillUseCase', `Skill ${newSkill.name} created`);
        
        return newSkill;
    }
}