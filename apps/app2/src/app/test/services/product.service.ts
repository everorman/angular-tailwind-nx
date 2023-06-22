import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(skip = 0, pageSize = 10, filterTerm = ''): Observable<Product[]> {
    const routePath = `https://api.escuelajs.co/api/v1/products?&categoryId=${filterTerm}`;
    return this.http.get<Product[]>(routePath);
  }

  update(data: Product) {
    const path = `https://api.escuelajs.co/api/v1/products/${data.id}`;
    delete data.id;
    return this.http.put(path, data);
  }
}
