import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { TestComponent } from './test.component';
import { productsResolver } from './resolvers/products.resolver';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProductService } from './services/product.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
      { path: '', redirectTo: '/test/list', pathMatch: 'full' },
      {
        path: '**',
        redirectTo: 'list ',
      },
    ],
  },
];
@NgModule({
  declarations: [TestComponent, ProductListComponent, ProductDialogComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
})
export class TestModule {}
