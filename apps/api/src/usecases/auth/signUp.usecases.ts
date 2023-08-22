import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { AccountWithoutPassword, AccountM, newAccount } from '../../domain/models/account';
import Role from '../../domain/models/enums/role.enum';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { AuthSignUpDto } from '../../infrastructure/controllers/auth/authSignUpDto.class';

export class SignUpUseCases {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AccountWithoutPassword> {
    const account = this.toNewAccount(authSignUpDto);
    account.password = await this.bcryptService.hash(authSignUpDto.password);
    return await this.accountRepository.createAccount(account);
  }

  private toNewAccount(authSignUpDto: AuthSignUpDto): newAccount {
    return {
      username: authSignUpDto.username,
      firstname: authSignUpDto.firstname,
      lastname: authSignUpDto.lastname,
      birthDate: authSignUpDto.birthDate,
      birthPlace: authSignUpDto.birthPlace,
      active: true,
      role: authSignUpDto.role,
      formationMode: authSignUpDto.formationMode,
    };
  }
}
