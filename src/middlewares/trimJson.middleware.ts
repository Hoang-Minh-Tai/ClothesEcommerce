// trim-json.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class TrimJsonMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.body && typeof req.body === 'object') {
      req.body = this.trimObject(req.body)
    }
    next()
  }

  private trimObject(obj: any): any {
    if (typeof obj !== 'object') {
      return obj
    }

    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim()
      } else if (typeof obj[key] === 'object') {
        obj[key] = this.trimObject(obj[key])
      }
    }

    return obj
  }
}
