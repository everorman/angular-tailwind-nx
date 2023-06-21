import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../services/product.types';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'angular-nx-tailwind-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  formProduct = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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
