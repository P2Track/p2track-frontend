import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCustomerModule } from './home-customer/home-customer.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InitialModule } from './initial/initial.module';
import { HomeOrganizationModule } from './home-organization/home-organization.module';
import { provideHttpClient } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeCustomerModule,
    InitialModule,
    HomeOrganizationModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
