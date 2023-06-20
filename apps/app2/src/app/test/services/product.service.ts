import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(skip = 0, pageSize = 10): Observable<Product[]> {
    const routePath = `https://api.escuelajs.co/api/v1/products?offset=${skip}&limit=${pageSize}`;
    return this.http.get<Product[]>(routePath);
  }
}
