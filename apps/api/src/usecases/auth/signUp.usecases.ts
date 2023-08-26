import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { AccountWithoutPassword } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { AuthSignUpDto } from '../../infrastructure/controllers/auth/authSignUpDto.class';
import { AccountMapper } from '../../infrastructure/mappers/account.mapper';

export class SignUpUseCases {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AccountWithoutPassword> {
    const account = AccountMapper.fromSignupDtoToNewAccount(authSignUpDto);
    account.password = await this.bcryptService.hash(authSignUpDto.password);
    return await this.accountRepository.createAccount(account);
  }
}
