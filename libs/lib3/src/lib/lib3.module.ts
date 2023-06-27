import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [ButtonComponent, LoadingComponent],
  exports: [ButtonComponent, LoadingComponent],
})
export class Lib3Module {}
