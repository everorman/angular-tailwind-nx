import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { TestComponent } from './test.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
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
  declarations: [TestComponent, ProductListComponent],
  imports: [RouterModule.forChild(routes), CommonModule, AngularMaterialModule],
})
export class TestModule {}
