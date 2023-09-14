import { SkillM } from "../models/skill";

export interface ISkillRepository {
    findSkillById(skillId: string): Promise<SkillM>;
    findSkillByName(skillName: string): Promise<SkillM>;
    createSkill(skill: SkillM): Promise<SkillM>;
    updateSkill(skill: SkillM): Promise<SkillM>;
    deleteSkill(skillId: string): Promise<SkillM>;
}