import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

  constructor(private authService: AuthService){}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req:Request) {
    return this.authService.loginWithCredentials(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Req() req) {
    return req.user
  }
}
