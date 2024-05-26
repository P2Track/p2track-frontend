import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrderDetail } from '../../../shared/interfaces/order-detail.interface';
import { EorderStatus } from '../../../shared/enum/order-status.enum';
import { statusTranslations } from '../../../assets/pt-br/pt-br';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  statusOptions =  Object.keys(EorderStatus);

  translations = statusTranslations;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IOrderDetail[],
     ){
  }

}
