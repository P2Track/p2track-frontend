import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCustomerComponent } from './home-customer.component';
import { HeaderComponent } from '../../partials/header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    HomeCustomerComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class HomeCustomerModule { }
