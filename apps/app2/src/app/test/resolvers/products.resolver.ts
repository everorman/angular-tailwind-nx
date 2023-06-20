import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../services/product.types';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';

export const productsResolver: ResolveFn<GridDataResult> = (route, state) => {
  const productService = inject(ProductService);
  return productService.getProducts(0, 0).pipe(
    map((items: Product[]) => {
      return {
        data: items.slice(0, 10),
        total: items.length / 10,
      };
    })
  );
};
