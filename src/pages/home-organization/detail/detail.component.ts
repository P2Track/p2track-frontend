import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrderDetail } from '../../../shared/interfaces/order-detail.interface';
import { EorderStatus } from '../../../shared/enum/order-status.enum';
import { statusTranslations } from '../../../assets/pt-br/pt-br';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order_service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  formGroup: FormGroup;

  statusOptions =  Object.keys(EorderStatus);

  translations = statusTranslations;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,
  private orderService: OrderService
     ){
      this.formGroup = this.formBuilder.group({
        status: ['', Validators.required]
      });
      console.log(typeof data);
  }

  ngAfterContentInit(): void {
    this.formGroup.valueChanges.subscribe(changes =>{
      console.log(changes);
    })
  }

  registerUpdatedStatus(): void {
    if (this.formGroup.get('status')?.value !== ''){
      this.orderService.updateOrderStatus(
          this.data[0],
          this.formGroup.get('status')?.value,
          String(new Date())
        )
    }
  }

}
