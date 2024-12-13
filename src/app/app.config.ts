import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    importProvidersFrom(
      // RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({ positionClass: 'toast-top-right' })
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
