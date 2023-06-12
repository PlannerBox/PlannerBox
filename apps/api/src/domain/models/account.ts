export class AccountWithoutPassword {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    birthDate: Date;
    birthPlace: string;
    lastLogin: Date;
    hashRefreshToken: string;
}

export class AccountM extends AccountWithoutPassword {
    password: string;
}