import { AccountM } from "../../domain/models/account";
import { AuthSignUpDto } from "../controllers/auth/authSignUpDto.class";
import { GenericUserAccountDto, UserAccountDto, UserAccountWithoutPasswordDto } from "../controllers/userManagement/userAccountDto.class";
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

    static fromEntityToModel(account: Account): AccountM {
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
            role: account.rolePermissions.role,
            rolePermissions: account.rolePermissions
        };
    }

    static fromDtoToModel(userAccountDto: UserAccountDto): AccountM {
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

    static fromUpdateDtoToModel(userAccountDto: UserAccountWithoutPasswordDto): AccountM {
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

    static fromSignupDtoToNewAccount(newAccountDto: AuthSignUpDto): AccountM {
        return {
            username: newAccountDto.username,
            password: newAccountDto.password,
            firstname: newAccountDto.firstname,
            lastname: newAccountDto.lastname,
            birthDate: newAccountDto.birthDate,
            birthPlace: newAccountDto.birthPlace,
            active: true,
            role: newAccountDto.role,
            formationMode: newAccountDto.formationMode,
        };
    }

    static fromGenericDtoToModel(userAccountDto: GenericUserAccountDto): AccountM {
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
}