import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { EorderStatus } from '../../shared/enum/order-status.enum';
import {v4 as uuidv4} from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrl: './home-customer.component.scss'
})
export class HomeCustomerComponent {

  formGroup!: FormGroup;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      trackingCode: ['', Validators.required]
    });
  }

  openDialog() {
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: {
        trackingCode: uuidv4(),
        orderDate: new Date(),
        orderStatus: EorderStatus.DELIVERED,
        deliveryAddress: 'Avenida Darcy Vargas',
        deliveryEstimation: new Date(),
        productName: 'Samsung Galaxy',
        quantity: 1,
        totalPrice: 2000,
        lastUpdate: new Date(),
      },
    });
  }

}
