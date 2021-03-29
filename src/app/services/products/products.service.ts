import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {
  }
  getProductStock(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createProductStock(productstock: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, productstock);
  }
  updateProductStock(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteProductStock(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
  getProductStockList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
