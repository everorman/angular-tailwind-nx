import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataResult, Product } from '../services/product.types';
import { Observable, finalize, map, of } from 'rxjs';
import {
  GridComponent,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'angular-nx-tailwind-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(GridComponent)
  private grid!: GridComponent;
  public gridItems!: Observable<GridDataResult>;
  public pageSize = 10;
  public skip = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm = null;
  loading = false;

  formProduct = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl(''),
  });

  constructor(
    protected route: ActivatedRoute,
    protected service: ProductService,
    protected dialog: MatDialog
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
    this.loading = true;
    this.gridItems = this.service.getProducts(this.skip, this.pageSize).pipe(
      map((items: Product[]) => {
        return { data: items, total: 4 };
      }),
      finalize(() => (this.loading = false))
    );
  }

  editClick(item: any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        item: item,
        form: this.formProduct,
      },
      maxWidth: '800px',
      minWidth: '400px',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGridItems();
      }
    });
  }
}
