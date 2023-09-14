import { InjectRepository } from "@nestjs/typeorm";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { Skill } from "../entities/Skill.entity";
import { Repository } from "typeorm";
import { SkillM } from "../../domain/models/skill";

export class SkillRepository implements ISkillRepository {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    findSkillById(skillId: string): Promise<SkillM> {
        throw new Error("Method not implemented.");
    }
    findSkillByName(skillName: string): Promise<SkillM> {
        throw new Error("Method not implemented.");
    }
    async createSkill(skill: SkillM): Promise<SkillM> {
        return await this.skillRepository.save(skill);
    }
    updateSkill(skill: SkillM): Promise<SkillM> {
        throw new Error("Method not implemented.");
    }
    deleteSkill(skillId: string): Promise<SkillM> {
        throw new Error("Method not implemented.");
    }
}