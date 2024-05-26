import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { InitialComponent } from './initial/initial.component';
import { HomeOrganizationComponent } from './home-organization/home-organization.component';

const routes: Routes = [
  { path: '', component: InitialComponent},
  { path: 'customer', component: HomeCustomerComponent},
  {path: 'organization', component: HomeOrganizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
