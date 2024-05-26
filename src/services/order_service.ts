import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderDetail } from '../shared/interfaces/order-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get_all_packages`);
  }

  registerOrder(data: IOrderDetail): Observable<Object> {
    return this.http.post(`${this.baseUrl}/post_package`, data);
  }

  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/data/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/data/${id}`);
  }
}
