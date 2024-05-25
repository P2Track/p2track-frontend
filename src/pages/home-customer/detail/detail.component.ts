import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrderDetail } from '../../../shared/interfaces/order-detail.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IOrderDetail) {}
}
