import { TeacherM } from "../../domain/models/teacher";
import { Teacher } from "../entities/Teacher.entity";
import { AccountMapper } from "./account.mapper";
import { SkillMapper } from "./skill.mapper";

export class TeacherMapper {
    static fromModelToEntity(teacherM: TeacherM): Teacher {
        return {
            id: teacherM.teacherId,
            intern: teacherM.intern,
            account: AccountMapper.fromModelToEntity(teacherM),
            teacherSkills: []
        }
    }

    static fromEntityToModel(teacher): TeacherM {
        return {
            teacherId: teacher.id,
            intern: teacher.intern,
            ...AccountMapper.fromEntityToModel(teacher.account)
        }
    }

    static fromGenericDtoToModel(teacherDto): TeacherM {
        return {
            teacherId: teacherDto.teacherId,
            intern: teacherDto.intern,
            ...AccountMapper.fromGenericDtoToModel(teacherDto)
        }
    }
}