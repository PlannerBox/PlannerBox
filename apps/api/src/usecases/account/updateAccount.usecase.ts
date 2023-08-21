import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { AccountWithoutPassword, AccountM } from "../../domain/models/account";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { UserAccountDto, UserAccountWithoutPasswordDto } from "../../infrastructure/controllers/userManagement/userAccountDto.class";
import { BadRequestException } from "@nestjs/common";


export class UpdateAccountUseCase {
    constructor(
        private readonly accountRepository: IAccountRepository,
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

        account.username = userAccount.username;
        account.firstname = userAccount.firstname;
        account.lastname = userAccount.lastname;
        account.birthDate = userAccount.birthDate;
        account.birthPlace = userAccount.birthPlace;
        account.active = userAccount.active;

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