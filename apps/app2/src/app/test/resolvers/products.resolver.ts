import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { map } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.types';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productService = inject(ProductService);
  return productService.getProducts(0, 0);
  // .pipe(
  //   map((items: Product[]) => {
  //     return {
  //       data: items.slice(0, 10),
  //       total: items.length / 10,
  //     };
  //   })
  // );
};
