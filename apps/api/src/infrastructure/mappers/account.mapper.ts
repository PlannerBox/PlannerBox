import { AccountM, newAccount } from "../../domain/models/account";
import { UserAccountDto } from "../controllers/userManagement/userAccountDto.class";
import { Account } from "../entities/Account.entity";

export class AccountMapper {
    static fromModelToEntity(accountM: AccountM): Account {
        return {
            id: accountM.id,
            username: accountM.username,
            password: accountM.password,
            firstname: accountM.firstname,
            lastname: accountM.lastname,
            birthDate: accountM.birthDate,
            birthPlace: accountM.birthPlace,
            lastLogin: accountM.lastLogin,
            hashRefreshToken: accountM.hashRefreshToken,
            active: accountM.active,
            rolePermissions: accountM.rolePermissions
        };
    }

    static fromEntityToModel(account: Account): newAccount {
        return {
            id: account.id,
            username: account.username,
            password: account.password,
            firstname: account.firstname,
            lastname: account.lastname,
            birthDate: account.birthDate,
            birthPlace: account.birthPlace,
            lastLogin: account.lastLogin,
            hashRefreshToken: account.hashRefreshToken,
            active: account.active,
            role: account.rolePermissions.role
        };
    }

    static fromDtoToModel(userAccountDto: UserAccountDto): newAccount {
        return {
            id: userAccountDto.id,
            username: userAccountDto.username,
            firstname: userAccountDto.firstname,
            lastname: userAccountDto.lastname,
            birthDate: userAccountDto.birthDate,
            birthPlace: userAccountDto.birthPlace,
            active: userAccountDto.active,
            role: userAccountDto.role,
        };
    }

    static fromNewAccountToEntity(newAccount: newAccount): Account {
        return {
            id: newAccount.id,
            username: newAccount.username,
            password: newAccount.password,
            firstname: newAccount.firstname,
            lastname: newAccount.lastname,
            birthDate: newAccount.birthDate,
            birthPlace: newAccount.birthPlace,
            lastLogin: newAccount.lastLogin,
            hashRefreshToken: newAccount.hashRefreshToken,
            active: newAccount.active,
            rolePermissions: newAccount.rolePermissions
        };
    }
}