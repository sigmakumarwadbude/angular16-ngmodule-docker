import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/home/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.module').then((m) => m.ProductModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
