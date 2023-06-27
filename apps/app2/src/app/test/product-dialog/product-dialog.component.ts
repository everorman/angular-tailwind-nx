import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, delay, map, startWith, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Category, Product } from '../services/product.types';
import { categories } from '../product-list/categories';
import { LoadingService } from '@angular-tailwind-nx/lib3';
@Component({
  selector: 'angular-nx-tailwind-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [LoadingService, ProductService],
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  formProduct!: FormGroup;
  subscription!: Subscription;
  isNew = false;
  categories = categories as any as Category[];
  filteredOptions!: Observable<Category[]> | undefined;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService,
    private loading: LoadingService
  ) {
    const { item, form, isNew } = data;
    const itemData = item['dataItem'];
    this.isNew = isNew;
    this.formProduct = form;
    console.log('data dialog', itemData);
    this.formProduct.patchValue(itemData as any);
  }

  ngOnInit(): void {
    this.filteredOptions = this.formProduct.get('category')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const category = typeof value === 'string' ? value : value?.name;
        return category ? this._filter(category as string) : this.categories;
      })
    );
  }

  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): any {
    if (this.isNew) {
      this.addNew();
    } else {
      this.update();
    }
  }

  update(): any {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      const obs = this.service
        .update(this.formProduct.value as any as Product)
        .pipe(
          delay(700),
          tap((result) => {
            this.dialogRef.close(result);
          })
        );
      this.loading.showLoaderUntilCompleted(obs);
      this.subscription = obs.subscribe();
    }
  }

  addNew(): any {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      const body = this.formProduct.value;
      body.categoryId = body.category.id;
      body.images = ['https://placeimg.com/640/480/any'];
      delete body.category;
      console.log(body);
      const obs = this.service
        .add(this.formProduct.value as any as Product)
        .pipe(
          delay(200),
          tap((result) => {
            this.dialogRef.close(result);
          })
        );
      this.loading.showLoaderUntilCompleted(obs);
      this.subscription = obs.subscribe();
    }
  }

  getErrorMessage(
    control: AbstractControl<string | null, string | null> | null
  ): string {
    if (!control) {
      return '';
    }
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('email') ? 'Not a valid value' : '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
