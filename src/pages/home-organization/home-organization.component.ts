import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {v4 as uuidv4} from 'uuid';
import { EorderStatus } from '../../shared/enum/order-status.enum';
import { RegisterOrderDialogComponent } from './register-order-dialog/register-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { statusTranslations } from '../../assets/pt-br/pt-br';

export interface FilterData {
  trackingCode: string;
  name: string;
  status: EorderStatus;
}


@Component({
  selector: 'app-home-organization',
  templateUrl: './home-organization.component.html',
  styleUrl: './home-organization.component.scss'
})
export class HomeOrganizationComponent {

  displayedColumns: string[] = ['trackingCode', 'name', 'status', 'actions'];
  dataSource: MatTableDataSource<FilterData>;
  translations = statusTranslations;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [
      { trackingCode: uuidv4(), name: 'Hydrogen', status: EorderStatus.SHIPPED},
      { trackingCode: uuidv4(), name: 'Helium', status: EorderStatus.SHIPPED},
      { trackingCode: uuidv4(), name: 'Lithium', status: EorderStatus.SHIPPED },
      { trackingCode: uuidv4(), name: 'Beryllium', status: EorderStatus.SHIPPED},
      { trackingCode: uuidv4(), name: 'Boron', status: EorderStatus.SHIPPED},
      { trackingCode: uuidv4(), name: 'Carbon', status: EorderStatus.SHIPPED},
      { trackingCode: uuidv4(), name: 'Nitrogen', status: EorderStatus.SHIPPED},
    ]
  }

  openRegisterOrderDialog() {
    this.dialog.open(RegisterOrderDialogComponent);
  }

  openDetailDialog() {
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: [{
        trackingCode: uuidv4(), orderDate: new Date(), orderStatus: EorderStatus.DELIVERED,
        deliveryAddress: 'Avenida Darcy Vargas', deliveryEstimation: new Date(), productName: 'Samsung Galaxy',
        quantity: 1, totalPrice: 2000, lastUpdate: new Date(),
      }, {
        trackingCode: uuidv4(), orderDate: new Date(), orderStatus: EorderStatus.DELIVERED,
        deliveryAddress: 'Avenida Darcy Vargas', deliveryEstimation: new Date(), productName: 'Samsung Galaxy',
        quantity: 1, totalPrice: 2000, lastUpdate: new Date(),
      }, {
        trackingCode: uuidv4(), orderDate: new Date(), orderStatus: EorderStatus.DELIVERED,
        deliveryAddress: 'Avenida Darcy Vargas', deliveryEstimation: new Date(), productName: 'Samsung Galaxy',
        quantity: 1, totalPrice: 2000, lastUpdate: new Date(),
      },
      ],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

