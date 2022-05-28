import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  @Inject(UserService)
  private readonly userService: UserService;

  // Login Functionality
  async signin(dto: SignDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid Credentionals');

    const passwordChecking = await this.comparePassword(
      dto.password,
      user.password,
    );

    if (!passwordChecking)
      throw new UnauthorizedException('Password dose not match');

    delete user.password;
    return this.createToken(user, 'user');
  }

  //Password checking with bcrypt
  comparePassword(password: string, storedPassword: string) {
    return bcrypt.compare(password, storedPassword);
  }

  // Jwt token create
  async createToken(user, type) {
    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
      type,
    });
    return { user, token };
  }
}
