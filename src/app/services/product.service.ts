import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlApi: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.urlApi}/products`);
  }

  deleteProduct(id: string): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${this.urlApi}/products/${id}`);
  }
}
