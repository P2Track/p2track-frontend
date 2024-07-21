import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order_service';
import { EorderStatus } from '../../../shared/enum/order-status.enum';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-register-order-dialog',
  templateUrl: './register-order-dialog.component.html',
  styleUrl: './register-order-dialog.component.scss'
})
export class RegisterOrderDialogComponent {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService
  ){}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      orderDate: ['', Validators.required],
      estimatedDate: ['', Validators.required],
      quantity: [null, Validators.required],
      totalPrice: [null, Validators.required],
    });
  }

  registerOrder()
  {
    this.orderService.createPackage(
      {
        trackingCode: uuidv4(),
        orderDate: this.formGroup.get('orderDate')?.value,
        orderStatus: EorderStatus.AWAITING_PAYMENT,
        deliveryAddress: this.formGroup.get('address')?.value,
        deliveryEstimation: this.formGroup.get('estimatedDate')?.value,
        productName: this.formGroup.get('name')?.value,
        quantity: this.formGroup.get('quantity')?.value,
        totalPrice: this.formGroup.get('totalPrice')?.value,
        lastUpdate: new Date()
      }
    )
  }
}

