import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common'

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const message = exception.message || 'Oops! Something fails'
    const errors = exception?.getResponse?.().errors || exception?.getResponse?.().error || ''
    const status_code =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status_code).json({
      errors,
      status_code,
      message,
    })
  }
}
