import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {v4 as uuidv4} from 'uuid';
import { EorderStatus } from '../../shared/enum/order-status.enum';
import { RegisterOrderDialogComponent } from './register-order-dialog/register-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { statusTranslations } from '../../assets/pt-br/pt-br';
import { OrderService } from '../../services/order_service';
import { UUID } from 'crypto';

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
  history!: Object[];

  constructor(public dialog: MatDialog,
    private orderService: OrderService
  ) {
    this.dataSource = new MatTableDataSource();
    this.loadTableData();
  }

  openRegisterOrderDialog() {
    this.dialog.open(RegisterOrderDialogComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadTableData() {
    this.orderService.getData().subscribe((data) => {
      for (let i = 1; i < data.data.length; i++) {
        console.log(data)
        this.dataSource.data.push({
          trackingCode: data.data[i].trackingCode,
          name: data.data[i].productName,
          status: data.data[i].orderStatus,
        })
    }
    })
  }

  loadHistoryData(trackingCode: UUID): void {
    this.orderService.getAllById(trackingCode).subscribe((data) => {
      this.history = data.data;
      console.log(this.history);
      this.openDetailDialogWithData();
    });
  }

  openDetailDialogWithData() {
    console.log(this.history);
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: this.history
    });
  }

}

