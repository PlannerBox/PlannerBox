import { InjectRepository } from "@nestjs/typeorm";
import { ISkillRepository } from "../../domain/repositories/skillRepository.interface";
import { Skill } from "../entities/Skill.entity";
import { Repository } from "typeorm";
import { SkillM } from "../../domain/models/skill";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";

export class SkillRepository implements ISkillRepository {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    async findSkillById(skillId: string): Promise<SkillM> {
        return await this.skillRepository.findOne({ where: { id: skillId } });
    }
    
    async findSkillByName(skillName: string): Promise<SkillM> {
        return await this.skillRepository.findOne({ where: { name: skillName } });
    }

    async createSkill(skill: SkillM): Promise<SkillM> {
        return await this.skillRepository.save(skill);
    }

    async upsertSkill(skill: SkillM): Promise<SkillM> {
        return await this.skillRepository.save(skill);
    }
    
    async deleteSkill(skillId: string){
        await this.skillRepository.delete(skillId);
    }

    async findSkills(query: PaginateQuery): Promise<Paginated<SkillM>> {
        const queryBuilder = this.skillRepository.createQueryBuilder('skill');

        return await paginate<SkillM>(query, queryBuilder, {
            sortableColumns: ['name'],
            searchableColumns: ['name'],
            defaultSortBy: [['name', 'ASC']]
        });
    }
}