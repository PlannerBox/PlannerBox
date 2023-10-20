import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "../entities/Teacher.entity";
import { Repository } from "typeorm";
import { ITeacherRepository } from "../../domain/repositories/teacherRepository.interface";
import { TeacherM } from "../../domain/models/teacher";
import { TeacherMapper } from "../mappers/teacher.mapper";
import { NotFoundError } from "rxjs";
import { NotFoundException } from "@nestjs/common";

export class TeacherRepository implements ITeacherRepository {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) {}

    async findTeacherById(teacherId: string): Promise<TeacherM> {
        const teacherEntity: Teacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        });

        if (!teacherEntity) {
            return null;
        }

        return TeacherMapper.fromEntityToModel(teacherEntity);
    }

    async findTeacherByAccountId(accountId: string): Promise<TeacherM> {
        const teacherEntity: Teacher = await this.teacherRepository.findOne({
            where: {
                account: { id: accountId }
            }
        });

        if (!teacherEntity) {
            return null;
        }

        return TeacherMapper.fromEntityToModel(teacherEntity);
    }

    async updateTeacher(teacher: TeacherM): Promise<any> {
        const teacherEntity = TeacherMapper.fromModelToEntity(teacher);
        console.log(teacherEntity);
        await this.teacherRepository.save(teacherEntity);
        return teacher;
    }
}