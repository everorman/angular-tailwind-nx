import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../services/product.types';
import { ProductService } from '../services/product.service';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productService = inject(ProductService);
  return productService.getProducts();
};
