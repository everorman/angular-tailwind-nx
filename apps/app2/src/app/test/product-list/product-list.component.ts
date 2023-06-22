import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  GridComponent,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Observable, finalize, map, of } from 'rxjs';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.types';
import { categories } from './categories';
import { SVGIcon, filePdfIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'angular-nx-tailwind-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(GridComponent)
  private grid!: GridComponent;
  gridItems: Observable<any[]> = of([]);
  pageSize = 10;
  skip = 0;
  sortDescriptor: SortDescriptor[] = [];
  filterTerm = '';
  loading = false;

  dropDownItems = categories;
  defaultItem = { text: 'Filter by Category', value: null };
  public filePdfIcon: SVGIcon = filePdfIcon;

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
    this.gridItems = this.service
      .getProducts(this.skip, this.pageSize, this.filterTerm)
      .pipe(finalize(() => (this.loading = false)));
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

  public handleFilterChange(item: any): void {
    this.filterTerm = item.value;
    this.skip = 0;
    this.loadGridItems();
  }
}
