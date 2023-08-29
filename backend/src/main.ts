import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { useContainer } from 'class-validator'
import helmet from 'helmet'
import * as compression from 'compression'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const test = configService.get('APP_PORT')

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableShutdownHooks()
  app.use(helmet())
  app.use(compression())
  app.enableCors({
    origin: configService.get('FRONTEND_DOMAIN'),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'PUT'],
  })

  await app.listen(configService.get('APP_PORT'))
}
bootstrap()
