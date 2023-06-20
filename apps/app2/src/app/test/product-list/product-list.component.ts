import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataResult, Product } from '../services/product.types';
import { Observable, map, of } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'angular-nx-tailwind-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public gridItems?: Observable<GridDataResult>;
  public pageSize = 10;
  public skip = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm = null;

  constructor(
    protected route: ActivatedRoute,
    protected service: ProductService
  ) {}

  ngOnInit(): void {
    this.gridItems = of(this.route.snapshot.data['products']);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getProducts(this.skip, this.pageSize).pipe(
      map((items: Product[]) => {
        return { data: items, total: 4 };
      })
    );
  }
}
