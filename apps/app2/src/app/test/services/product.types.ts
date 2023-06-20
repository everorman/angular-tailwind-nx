export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}

export interface DataResult<T> {
  data?: T;
  total?: number;
}
