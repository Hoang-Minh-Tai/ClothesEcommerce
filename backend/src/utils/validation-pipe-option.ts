import { HttpException, HttpStatus, ValidationError, ValidationPipeOptions } from '@nestjs/common'

const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status_code: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.property]: Object.values(currentValue.constraints).join(', '),
          }),
          {}
        ),
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    ),
}

export default validationPipeOptions
