import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { UserAccountDto, UserAccountWithoutPasswordDto } from "../../infrastructure/controllers/userManagement/userAccountDto.class";
import { BadRequestException } from "@nestjs/common";
import { StudentAccountDto } from "../../infrastructure/controllers/userManagement/studentAccountDto.class";
import { StudentM } from "../../domain/models/student";
import { IStudentRepository } from "../../domain/repositories/studentRepository.interface";
import { StudentMapper } from "../../infrastructure/mappers/student.mapper";


export class UpdateAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly studentRepository: IStudentRepository,
        private readonly bcryptService: IBcryptService,
        private readonly logger: ILogger,
    ) { }

    async updateAccount(userAccountDto: UserAccountWithoutPasswordDto): Promise<AccountWithoutPassword> {
        const userAccount = this.toAccount(userAccountDto);
        const account = await this.accountRepository.findAccountById(userAccount.id);

        if (!account) {
            this.logger.error('AccountManagementUseCases updateAccountState', 'Account not found')
            throw new BadRequestException('Account not found');
        }
        account.id=userAccount.id;
        account.username = userAccount.username;
        account.firstname = userAccount.firstname;
        account.lastname = userAccount.lastname;
        account.birthDate = userAccount.birthDate;
        account.birthPlace = userAccount.birthPlace;
        account.active = userAccount.active;

        const accountWithoutPassword= await this.accountRepository.updateAccount(account);
        return accountWithoutPassword;
    }

    async updateStudentAccount(studentAccountDto: StudentAccountDto): Promise<any> {
        const student = await this.studentRepository.findStudentById(studentAccountDto.studentId);

        if (!student) {
            this.logger.error('UpdateAccountUseCases updateStudentAccount', 'Account not found')
            throw new BadRequestException('Account not found');
        }

        const studentAccount = StudentMapper.fromDtoToModel(studentAccountDto);

        student.username = studentAccount.username;
        student.firstname = studentAccount.firstname;
        student.lastname = studentAccount.lastname;
        student.birthDate = studentAccount.birthDate;
        student.birthPlace = studentAccount.birthPlace;
        student.active = studentAccount.active;
        student.formationMode = studentAccount.formationMode;

        return await this.studentRepository.updateStudent(student);
    }

    private toAccount(userAccountDto: UserAccountWithoutPasswordDto): AccountWithoutPassword {
        return {
            id: userAccountDto.id,
            username: userAccountDto.username,
            firstname: userAccountDto.firstname,
            lastname: userAccountDto.lastname,
            birthDate: userAccountDto.birthDate,
            birthPlace: userAccountDto.birthPlace,
            active: userAccountDto.active
        }
    }
}