import { LoadingService } from '@angular-tailwind-nx/lib3';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.types';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private loading: LoadingService) {}

  getProducts(skip = 0, pageSize = 10, filterTerm = 0): Observable<Product[]> {
    const routePath = filterTerm
      ? `https://api.escuelajs.co/api/v1/products?&categoryId=${filterTerm}`
      : `https://api.escuelajs.co/api/v1/products`;
    return this.http.get<Product[]>(routePath);
  }

  add(data: Product) {
    console.log('Testing');
    const path = `https://api.escuelajs.co/api/v1/products`;
    delete data.id;
    return this.http.post(path, data);
  }

  update(data: Product) {
    const path = `https://api.escuelajs.co/api/v1/products/${data.id}`;
    delete data.id;
    return this.loading.showLoaderUntilCompleted(this.http.put(path, data));
  }
}
