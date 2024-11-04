import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthHttpInterceptor, authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-ydcodecraft.ca.auth0.com',
      clientId: 'BAWgx55vPLRKjhPM6lgldLqT9r3kWAPZ',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/',
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/',
              }
            }
          },
          {
            uri: 'http://127.0.0.1:8000/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://dev-ydcodecraft.ca.auth0.com/api/v2/',
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
