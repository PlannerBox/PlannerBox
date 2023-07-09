import { IBcryptService } from "../../domain/adapters/bcrypt.interface";
import { IJwtService, IJwtServicePayload } from "../../domain/adapters/jwt.interface";
import { JWTConfig } from "../../domain/config/jwt.interface";
import { ILogger } from "../../domain/logger/logger.interface";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { sendEmail } from "../../utils/email/sendEmail.js";

export class LoginUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly jwtTokenService: IJwtService,
        private readonly jwtConfig: JWTConfig
    ) { }

    async getCookieToResetUserPassword(username: string) {
        this.logger.log('ResetPasswordUseCases execute', `The user ${username} want to reset his password.`);
        const payload: IJwtServicePayload = { username: username };
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = 1800 + 's'; // custom expiration time
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=1800`;
    }

    async sendMail(mail: string) {
        sendEmail(mail, "Password reset request", {name = "John", link = "http://localhost:3000/reset-password"})
    }

}