import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { UserAccountDto, UserAccountWithoutPasswordDto } from "../../infrastructure/controllers/user/userAccountDto.class";
import { BadRequestException } from "@nestjs/common";


export class UpdateAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly bcryptService: IBcryptService,
        private readonly logger: ILogger,
    ) { }

    async updateAccount(userAccountDto: AccountM): Promise<AccountWithoutPassword> {
        const account = await this.accountRepository.findAccountById(userAccountDto.id);
        if (!account) {
            this.logger.error('AccountManagementUseCases updateAccountState', 'Account not found')
            throw new BadRequestException('Account not found');
        }

        account.username = userAccountDto.username;
        account.firstname = userAccountDto.firstname;
        account.lastname = userAccountDto.lastname;
        account.birthDate = userAccountDto.birthDate;
        account.birthPlace = userAccountDto.birthPlace;
        account.active = userAccountDto.active;

        const accountWithoutPassword= await this.accountRepository.updateAccount(account);
        return accountWithoutPassword;
    }

    private toAccount(userAccountDto: UserAccountWithoutPasswordDto): AccountWithoutPassword {
        return {
            id: userAccountDto.id,
            username: userAccountDto.username,
            firstname: userAccountDto.firstname,
            lastname: userAccountDto.lastname,
            birthDate: userAccountDto.birthDate,
            birthPlace: userAccountDto.birthPlace,
            active: userAccountDto.active,
        }
    }
}