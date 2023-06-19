import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';

const routes: Routes = [
  {
    path: 'test',
    loadChildren: () =>
      import('./test/test-routing.module').then((m) => m.TestRoutingModule),
  },
  {
    path: '**',
    component: ExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
