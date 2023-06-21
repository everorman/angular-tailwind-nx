import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.types';

@Component({
  selector: 'angular-nx-tailwind-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  formProduct!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService
  ) {
    const { item, form } = data;
    const itemData = item['dataItem'];
    this.formProduct = form;
    this.formProduct.patchValue(itemData as any);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): any {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      this.service
        .update(this.formProduct.value as any as Product)
        .pipe(
          tap((result) => {
            this.dialogRef.close(result);
          })
        )
        .subscribe();
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
}
