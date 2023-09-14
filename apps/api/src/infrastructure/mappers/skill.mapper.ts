import { SkillM } from "../../domain/models/skill";
import { SkillDto } from "../controllers/skillManagement/skillDto.class";

export class SkillMapper {
    static toDomain(skillDto: SkillDto) : SkillM {
        const skill = new SkillM();
        skill.id = skillDto.id;
        skill.name = skillDto.name;
        return skill;
    }
    static toDto(skill: SkillM) : SkillDto {
        const skillDto = new SkillDto();
        skillDto.id = skill.id;
        skillDto.name = skill.name;
        return skillDto;
    }   
}