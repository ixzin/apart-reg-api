import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @Post('auth/refresh')
  async refresh(@Body() req) {
    return this.authService.refreshToken(req.login, req.token);
  }

  @Post('auth/logout')
  async logout(@Body() req) {
    return this.authService.stopUserSession(req.login);
  }

}