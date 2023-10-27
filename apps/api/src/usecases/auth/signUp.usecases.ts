import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { AccountWithoutPassword } from '../../domain/models/account';
import { IAccountRepository } from '../../domain/repositories/accountRepository.interface';
import { IGroupMemberRepository } from '../../domain/repositories/groupMemberRepository.interface';
import { ISkillRepository } from '../../domain/repositories/skillRepository.interface';
import { AuthSignUpDto } from '../../infrastructure/controllers/auth/authSignUpDto.class';
import { AccountMapper } from '../../infrastructure/mappers/account.mapper';

export class SignUpUseCases {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly bcryptService: IBcryptService,
    private readonly groupMemberRepository: IGroupMemberRepository,
    private readonly skillRepository: ISkillRepository,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AccountWithoutPassword> {
    const account = AccountMapper.fromSignupDtoToModel(authSignUpDto);
    account.password = await this.bcryptService.hash(authSignUpDto.password);
    const newAccount = await this.accountRepository.createAccount(account);
    authSignUpDto.groups.forEach(async (groupId) => {
      await this.groupMemberRepository.upsertGroupMember(groupId, newAccount.id, false);
    });
    return newAccount;
  }
}
