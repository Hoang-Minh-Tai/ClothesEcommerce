import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { useContainer } from 'class-validator'
import helmet from 'helmet'
import * as compression from 'compression'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import validationPipeOptions from './utils/validation-pipe-option'
import { BaseExceptionFilter } from './exceptions/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.enableShutdownHooks()

  app.use(helmet())

  app.use(compression())

  app.enableCors({
    origin: configService.get('FRONTEND_DOMAIN'),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'PUT'],
  })

  // Validation
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions))

  // Exception
  app.useGlobalFilters(new BaseExceptionFilter())

  await app.listen(configService.get('APP_PORT'))
}
bootstrap()
