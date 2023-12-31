import {enableProdMode, importProvidersFrom, LOCALE_ID} from '@angular/core';

import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {provideAnimations} from '@angular/platform-browser/animations';
import {PortalModule} from '@angular/cdk/portal';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {ROUTES} from "./ROUTES";
import localeSk from '@angular/common/locales/sk';
import {registerLocaleData} from "@angular/common";
registerLocaleData(localeSk);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, PortalModule, FormsModule, MatDialogModule),
    provideRouter(ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: "sk-Sk" },
  ]
})
  .catch(err => console.error(err));
