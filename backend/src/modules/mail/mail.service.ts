import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  async sendEmail() {
    try {
      await this.mailerService.sendMail({
        to: 'hoangminhtaiit@gmail.com',
        subject: 'testing email',
        text: 'Helo',
        html: '<h1> Whats up </h1>',
      })
      console.log('Email sent successfully')
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  async verifyEmail(email: string, token: string) {
    const verificationLink = `${process.env.BACKEND_DOMAIN}/confirm/${token}` // Assuming you have BACKEND_URL set in your environment variables

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification email',
      template: 'confirm-email',
      context: {
        app_name: 'Souvenir',
        title: 'Confirm email',
        text1: 'Hey!',
        text2: 'You’re almost ready to start enjoying',
        text3: 'Simply click the big green button below to verify your email address.',
        verificationLink: verificationLink, // Pass this to your template
      },
    })
  }

  async forgotPassword(mailData) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Reset password',
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.code
      } Reset password`,
      template: 'reset-password',
      context: {
        title: 'Reset password',
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.code
        }`,
        actionTitle: 'Reset password',
        // app_name: this.configService.get('app.name'),
        app_name: mailData.data.code,
        text1: 'Trouble signing in?',
        text2: 'Resetting your password is easy.',
        text3:
          'Just press the button below and follow the instructions. We’ll have you up and running in no time.',
        text4: 'If you did not make this request then please ignore this email.',
      },
    })
  }

  async recoverAccount(mailData) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Recover account',
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.code
      } Recover account`,
      template: 'recover-account',
      context: {
        title: 'Recover account',
        url: `${this.configService.get('app.frontendDomain')}/confirm-email/${mailData.data.code}`,
        actionTitle: 'Recover account',
        // app_name: this.configService.get('app.name'),
        app_name: mailData.data.code,
        text1: 'Hey!',
        text2: 'You’re almost ready to start enjoying',
        text3: 'Simply click the big green button below to verify your email address.',
      },
    })
  }
}
