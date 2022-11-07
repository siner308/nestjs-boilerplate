import { Module } from '@nestjs/common';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';
import { env } from '../../env';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<KeycloakConnectOptions> => {
        return {
          authServerUrl: configService.get(env.keycloak.authServerUrl),
          realm: configService.get(env.keycloak.realm),
          clientId: configService.get(env.keycloak.clientId),
          secret: configService.get(env.keycloak.secret),
        };
      },
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AuthModule {}
