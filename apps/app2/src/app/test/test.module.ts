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
import { ChartsComponent } from './charts/charts.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
// Imports the Chart module
import { ChartModule } from '@progress/kendo-angular-charts';

// Imports the Sparkline module
import { SparklineModule } from '@progress/kendo-angular-charts';
import { LoadingService } from '@angular-tailwind-nx/lib3';
import { Lib3Module } from '@angular-tailwind-nx/lib3';

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
      {
        path: 'charts',
        component: ChartsComponent,
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
    ChartsComponent,
  ],
  providers: [ProductService, MatDatepickerModule, LoadingService],
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
    ChartModule,
    SparklineModule,
    TreeViewModule,
    Lib3Module,
  ],
})
export class TestModule {}
