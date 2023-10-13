import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

export const mailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('mail.host'),
    // port: configService.get('mail.port'),
    // ignoreTLS: configService.get('mail.ignoreTLS'),
    secure: configService.get('mail.secure'),
    requireTLS: configService.get('mail.requireTLS'),
    auth: {
      user: configService.get('mail.user'),
      pass: configService.get('mail.password'),
    },
  },
  defaults: {
    from: `"${configService.get('mail.defaultName')}" <${configService.get('mail.defaultEmail')}>`,
  },
  template: {
    dir: join(__dirname, 'mail-templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
})
