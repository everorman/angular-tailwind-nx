import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfileComponent } from './profile/profile.component';
import { productsResolver } from './resolvers/products.resolver';
import { ProductService } from './services/product.service';
import { TestComponent } from './test.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
        resolve: {
          products: productsResolver,
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
          products: productsResolver,
        },
      },
      { path: '', redirectTo: '/test/list', pathMatch: 'full' },
      {
        path: '**',
        redirectTo: 'list ',
      },
    ],
  },
];
@NgModule({
  declarations: [
    TestComponent,
    ProductListComponent,
    ProductDialogComponent,
    ProfileComponent,
    TopBarComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownsModule,
    PDFModule,
  ],
  providers: [ProductService, MatDatepickerModule],
})
export class TestModule {}
