import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { orderStatus } from '../../shared/enum/order-status.enum';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrl: './home-customer.component.scss'
})
export class HomeCustomerComponent {

  constructor(public dialog: MatDialog){}

  openDialog() {
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: {
        trackingCode: uuidv4(),
        orderDate: new Date(),
        orderStatus: orderStatus.DELIVERED,
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
