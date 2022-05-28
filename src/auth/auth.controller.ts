import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SignDto) {
    const user = await this.authService.signin(dto);
    return {
      message: 'Login Successfully',
      user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protect')
  protect(): string {
    return 'hello';
  }
}
