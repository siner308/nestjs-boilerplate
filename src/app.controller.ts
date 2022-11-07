import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public, Resource, Roles, Scopes } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public(false)
  index(): string {
    return 'OK';
  }

  @Get('/hello')
  @Public(false)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/world')
  @Roles({ roles: ['admin'] })
  getWorld(): string {
    return 'world';
  }

  @Get('/some')
  @Scopes('View')
  getSome(): string {
    return 'wow';
  }
}
