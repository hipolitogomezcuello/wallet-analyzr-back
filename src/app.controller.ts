import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "./auth/auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get('test')
  getHello(@Request() req): any {
    return req.user
    //return process.env.DB_HOST || 'localhost';
  }
}
