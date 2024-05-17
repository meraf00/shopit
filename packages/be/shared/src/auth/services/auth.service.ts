import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  public async verify(token: string, secret: string) {
    const decoded: any = this.jwt.verify(token, { secret });

    if (!decoded) {
      throw new UnauthorizedException('invalid_token');
    }

    return decoded;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Generate JWT Token
  public generateAccessToken(payload: any): string {
    return this.jwt.sign(
      { ...payload },
      {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      },
    );
  }

  // Generate JWT Refresh Token
  public generateRefreshToken(payload: any): string {
    return this.jwt.sign(
      { ...payload },
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
      },
    );
  }

  public async generateToken(account: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { id: account.id, email: account.email },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        },
      ),
      this.jwt.signAsync(
        { id: account.id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  // Validate User's password
  public compareHashedValue(
    originalValue: string,
    hashedValue: string,
  ): boolean {
    return bcrypt.compareSync(originalValue, hashedValue);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt);
  }
}
