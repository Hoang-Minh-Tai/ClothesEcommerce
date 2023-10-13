// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from './auth.service' // You'll need to create this service

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'), // Replace with your actual secret key
    })
  }

  async validate(payload: any) {
    console.log(payload)

    if (payload.type !== 'access') throw new UnauthorizedException('Invalid token')

    const user = this.authService.validateUser(payload.id)

    if (!user) throw new UnauthorizedException('Invalid token')
    return user
  }
}
