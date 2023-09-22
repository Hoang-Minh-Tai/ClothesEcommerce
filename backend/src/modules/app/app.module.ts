import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSource } from '../../database/data-source'
import { UserModule } from '../user/user.module'
import { ItemModule } from '../item/item.module'
import { CartModule } from '../cart/cart.module'
import { DiscountModule } from '../discount/discount.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailerConfig } from '../mail/mail-config.service'
import databaseConfig from 'src/config/database.config'
import mailConfig from 'src/config/mail.config'
import appConfig from 'src/config/app.config'
import { AppLoggerMiddleware } from 'src/middlewares/logger.middleware'

@Module({
  imports: [
    // For configuration
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig, mailConfig] }),

    // For connecting db
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: dataSource,
    }),

    //For sending mail
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mailerConfig, // Use the mailerConfig function to configure MailerModule
    }),

    // Entity modules
    UserModule,
    ItemModule,
    CartModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
