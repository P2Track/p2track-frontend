import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterOrderDialogComponent } from './register-order-dialog/register-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { statusTranslations } from '../../assets/pt-br/pt-br';
import { OrderService } from '../../services/order_service';
import { IOrderDetail } from '../../shared/interfaces/order-detail.interface';

export interface FilterData {
  trackingCode: string;
  name: string;
  status: string; // Use string to store the translated status
}

@Component({
  selector: 'app-home-organization',
  templateUrl: './home-organization.component.html',
  styleUrls: ['./home-organization.component.scss']
})
export class HomeOrganizationComponent implements OnInit {

  displayedColumns: string[] = ['trackingCode', 'name', 'status', 'actions'];
  dataSource: MatTableDataSource<FilterData>;
  translations = statusTranslations;
  history!: Object[];

  constructor(public dialog: MatDialog, private orderService: OrderService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
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

  async loadTableData() {
    try {
      const data: IOrderDetail[] = await this.orderService.getPackages();
      const filterData: FilterData[] = data.map(order => ({
        trackingCode: order.trackingCode,
        name: order.productName,
        status: this.translations[order.orderStatus] || order.orderStatus
      }));
      this.dataSource.data = filterData;
    } catch (error) {
      console.error('Error loading table data:', error);
    }
  }

  async loadHistoryData(trackingCode: string): Promise<void> {
    try {
      const data = await this.orderService.getPackageByTrackingCode(trackingCode);
      this.history = data;
      this.openDetailDialogWithData();
    } catch (error) {
      console.error('Error loading history data:', error);
    }
  }

  openDetailDialogWithData() {
    this.dialog.open(DetailComponent, {
      width: '30%',
      data: this.history
    });
  }
}
