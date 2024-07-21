import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { EorderStatus } from '../../shared/enum/order-status.enum';
import {v4 as uuidv4} from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order_service';
import { UUID } from 'crypto';
import { IOrderDetail } from '../../shared/interfaces/order-detail.interface';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrl: './home-customer.component.scss'
})
export class HomeCustomerComponent {

  formGroup!: FormGroup;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ){}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      trackingCode: ['', Validators.required]
    });
  }

  openDialog(data: IOrderDetail) {
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: data,
    });
  }

  async loadUpdated(trackingCode: UUID): Promise<void> {
    const data = await this.orderService.getPackageByTrackingCode(trackingCode)
      this.openDialog(data)
  }

}
