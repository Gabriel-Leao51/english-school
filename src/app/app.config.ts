import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { RouterModule, provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({ positionClass: 'toast-top-right' })
    ),
  ],
};
