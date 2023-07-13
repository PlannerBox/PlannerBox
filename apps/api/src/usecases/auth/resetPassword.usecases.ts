import { ILogger } from "../../domain/logger/logger.interface";
import * as nodemailer from 'nodemailer';
import { IJwtService, IJwtServicePayload } from "../../domain/adapters/jwt.interface";
import { JWTConfig } from "../../domain/config/jwt.interface";
import { BadRequestException } from "@nestjs/common";
import { IAccountRepository } from "../../domain/repositories/accountRepository.interface";
import { IBcryptService } from "../../domain/adapters/bcrypt.interface";

export class ResetPasswordUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly jwtTokenService: IJwtService,
        private readonly jwtConfig: JWTConfig,
        private readonly accountRepository: IAccountRepository,
        private readonly bcryptService: IBcryptService
    ) { }

    /// <summary>
    ///     Send a mail to the user with a link to reset his password
    /// </summary>
    async askResetPassword(username: string) {
        this.logger.log('ResetPasswordUseCases execute', `The user ${username} want to reset his password.`);
        
        const token = this.generateResetToken(username);

        const result = await this.sendMail(username, token);

        if (result) {
            this.logger.log('ResetPasswordUseCases execute', `The mail has been sent.`);
        }

        this.logger.log('ResetPasswordUseCases execute', `The mail has not been sent.`);
    }

    /// <summary>
    ///     Reset the password of the user if the given token is valid
    /// </summary>
    async resetPassword(token: string, password: string): Promise<any> {
        let payload = await this.checkTokenValidity(token);

        await this.accountRepository.resetPassword(payload.username, await this.bcryptService.hash(password));
    }

    private async sendMail(mail: string, token: string): Promise<boolean> {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.CONFIG_SMTP_HOST,
            port: process.env.CONFIG_SMTP_PORT,
            secure: process.env.CONFIG_SMTP_SECURE,
            service: process.env.CONFIG_SMTP_SERVICE,
            auth: {
                user: process.env.CONFIG_MAIL_USER,
                pass: process.env.CONFIG_MAIL_PASSWORD,
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        // create mail options (content of the mail)
        let mailOptions = {
            from: '"Plannerbox" <' + process.env.CONFIG_MAIL_USER + '>', 
            to: mail, // list of receivers (separated by ,)
            subject: 'Forgotten Password', 
            text: 'Forgot Password',
            html: 'Hi! <br><br> If you requested to reset your password<br><br>'+
            '<a href='+ process.env.NEXT_PUBLIC_API_URL +'/auth/email/change-password/'+ token + '>Click here</a>' + // html body
            '<br><br> If you did not request a password reset, please ignore this email or reply to let us know.<br><br>'
        };

        // send the mail
        return await new Promise<boolean>(async function(resolve, reject) {
            return await transporter.sendMail(mailOptions, async (error: any, info: { messageId: any; }) => {
                if (error) {
                    return reject(false);
                }
                resolve(true);
            });
        })
    }

    private generateResetToken(username: string): string {
            const payload: IJwtServicePayload = { username: username };
            const secret = this.jwtConfig.getJwtSecret();
            const expiresIn = 1800 + 's'; // custom expiration time
            return this.jwtTokenService.createToken(payload, secret, expiresIn);
    }

    private async checkTokenValidity(token: string): Promise<any> {
        try{
            let payload = await this.jwtTokenService.checkToken(token);
            this.logger.log('ResetPasswordUseCases execute', `The user is verified his password will be update.`);
            return payload;
        } catch (error) {
            this.logger.error('ResetPasswordUseCases execute', `${error}`);
            throw new BadRequestException(`${error}`);
        }
    }
}