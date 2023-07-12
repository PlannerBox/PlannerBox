import { ILogger } from "../../domain/logger/logger.interface";
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { IJwtService, IJwtServicePayload } from "../../domain/adapters/jwt.interface";
import { JWTConfig } from "../../domain/config/jwt.interface";

export class ResetPasswordUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly jwtTokenService: IJwtService,
        private readonly jwtConfig: JWTConfig,
    ) { }

    async askResetPassword(username: string): Promise<boolean> {
        this.logger.log('ResetPasswordUseCases execute', `The user ${username} want to reset his password.`);
        
        const token = this.generateResetToken(username);

        return await this.sendMail(username, token);
    }
    private async sendMail(mail: string, token: string): Promise<boolean> {

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

        let mailOptions = {
            from: '"Plannerbox" <' + process.env.CONFIG_MAIL_USER + '>', 
            to: mail, // list of receivers (separated by ,)
            subject: 'Forgotten Password', 
            text: 'Forgot Password',
            html: 'Hi! <br><br> If you requested to reset your password<br><br>'+
            '<a href='+ process.env.NEXT_PUBLIC_API_URL +'/auth/email/change-password/'+ token + '>Click here</a>' + // html body
            '<br><br> If you did not request a password reset, please ignore this email or reply to let us know.<br><br>'
        };

        return await new Promise<boolean>(async function(resolve, reject) {
            return await transporter.sendMail(mailOptions, async (error: any, info: { messageId: any; }) => {
                if (error) {
                    console.log('Message sent: %s', error);
                    return reject(false);
                }
                console.log('Message sent: %s', info.messageId);
                resolve(true);
            });
        })
    }

    private generateResetToken(username: string): string {
            this.logger.log('ResetPasswordUseCases execute', `The user ${username} want to reset his password.`);
            const payload: IJwtServicePayload = { username: username };
            const secret = this.jwtConfig.getJwtSecret();
            const expiresIn = 1800 + 's'; // custom expiration time
            return this.jwtTokenService.createToken(payload, secret, expiresIn);
    }
}