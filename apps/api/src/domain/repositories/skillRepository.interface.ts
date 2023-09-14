import { PaginateQuery, Paginated } from "nestjs-paginate";
import { SkillM } from "../models/skill";

export interface ISkillRepository {
    findSkillById(skillId: string): Promise<SkillM>;
    findSkillByName(skillName: string): Promise<SkillM>;
    createSkill(skill: SkillM): Promise<SkillM>;
    upsertSkill(skill: SkillM): Promise<SkillM>;
    deleteSkill(skillId: string): void;
    findSkills(query: PaginateQuery): Promise<Paginated<SkillM>>;
}