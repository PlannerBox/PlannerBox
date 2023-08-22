import { newAccount } from "../../domain/models/account";
import { StudentM } from "../../domain/models/student";
import { StudentAccountDto } from "../controllers/userManagement/studentAccountDto.class";
import { Student } from "../entities/Student.entity";
import { AccountMapper } from "./account.mapper";

export class StudentMapper {
    static fromModeltoEntity(studentM: StudentM): Student {
        return {
            id: studentM.studentId,
            formationMode: studentM.formationMode,
            account: AccountMapper.fromModelToEntity(studentM)
        }
    }

    static fromEntityToModel(student: Student): StudentM {
        return {
            studentId: student.id,
            formationMode: student.formationMode,
            ...AccountMapper.fromEntityToModel(student.account)
        }
    }

    static fromDtoToModel(studentDto: StudentAccountDto): StudentM {
        return {
            studentId: studentDto.studentId,
            formationMode: studentDto.formationMode,
            ...AccountMapper.fromDtoToModel(studentDto)
        }
    }

    static fromNewAccountToEntity(newStudentAccount: newAccount): Student {
        return {
            id: newStudentAccount.id,
            formationMode: newStudentAccount.formationMode,
            account: AccountMapper.fromNewAccountToEntity(newStudentAccount)
        }
    }
}