import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { AccountWithoutPassword, AccountM } from '../../domain/models/account';
import Role from '../../domain/models/enums/role.enum';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { AuthSignUpDto } from '../../infrastructure/controllers/auth/authSignUpDto.class';

export class SignUpUseCases {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

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
      birthDate: authSignUpDto.birthDate,
      birthPlace: authSignUpDto.birthPlace,
      active: true,
    };
  }
}
