import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthService } from './services/auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule, AuthModule],
  providers: [
    AuthService,
    JwtService,
    JwtRefreshGuard,
    JwtGuard,
    JwtStrategy,
    Reflector,
  ],
  exports: [Reflector, AuthService, JwtService],
})
export class AuthModule {}
