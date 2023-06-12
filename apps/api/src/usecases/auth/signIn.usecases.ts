import { IBcryptService } from "src/domain/adapters/bcrypt.interface";
import { AccountM, AccountWithoutPassword } from "src/domain/models/account";
import { IAccountRepository } from "src/domain/repositories/accountRepository.interface";
import { AuthSignInDto } from "src/infrastructure/controllers/auth/authSignInDto.class";

export class SignInUseCases {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly bcryptService: IBcryptService
    ) { }

    async signIn(authSignInDto: AuthSignInDto): Promise<AccountWithoutPassword> {
        const account = this.toAccountM(authSignInDto);
        account.password = await this.bcryptService.hash(authSignInDto.password);
        return await this.accountRepository.createAccount(account);
    }

    private toAccountM(authSignInDto: AuthSignInDto): AccountM {
        return {
            username: authSignInDto.username,
            firstname: authSignInDto.firstname,
            lastname: authSignInDto.lastname,
            email: authSignInDto.email,
            birthDate: authSignInDto.birthDate,
            birthPlace: authSignInDto.birthPlace,
        }
    }
}