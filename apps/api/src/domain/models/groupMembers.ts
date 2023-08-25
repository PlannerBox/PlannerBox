import { Account } from "../../infrastructure/entities/Account.entity";
import { Group } from "./group";

export class GroupMembers {
    id?: string;
    accountId: string;
    groupId: string;
    group: Group;
    account: Account;
}