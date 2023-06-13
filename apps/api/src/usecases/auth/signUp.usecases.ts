import { IBcryptService } from "src/domain/adapters/bcrypt.interface";
import { AccountM, AccountWithoutPassword } from "src/domain/models/account";
import { IAccountRepository } from "src/domain/repositories/accountRepository.interface";
import { AuthSignUpDto } from "src/infrastructure/controllers/auth/authSignUpDto.class";

export class SignUpUseCases {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly bcryptService: IBcryptService
    ) { }

    async signUp(authSignUpDto: AuthSignUpDto): Promise<AccountWithoutPassword> {
        const account = this.toAccountM(authSignUpDto);
        account.password = await this.bcryptService.hash(authSignUpDto.password);
        return await this.accountRepository.createAccount(account);
    }

    private toAccountM(authSignUpDto: AuthSignUpDto): AccountM {
        return {
            username: authSignUpDto.username,
            firstname: authSignUpDto.firstname,
            lastname: authSignUpDto.lastname,
            email: authSignUpDto.email,
            birthDate: authSignUpDto.birthDate,
            birthPlace: authSignUpDto.birthPlace,
        }
    }
}