import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthHttpInterceptor, authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.audience,
      },
      httpInterceptor: {
        allowedList: [
          // {
          //   uri: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/*',
          //   tokenOptions: {
          //     authorizationParams: {
          //       audience: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/',
          //     }
          //   }
          // },
          {
            uri: `${environment.backend.uri}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience,
              }
            }
          }
        ]
      }
    }),
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthHttpInterceptor, 
      multi: true
    },
    provideHttpClient(withInterceptors([authHttpInterceptorFn])), provideAnimationsAsync(),
  ]
};
