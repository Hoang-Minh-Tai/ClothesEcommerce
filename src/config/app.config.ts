import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT, 10) || 10000,
  throttleTTL: parseInt(process.env.THROTTLE_TTL, 10) || 60,
  throttleLimit: parseInt(process.env.THROTTLE_LIMIT, 10) || 400,
}))
