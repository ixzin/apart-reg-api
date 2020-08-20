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

}