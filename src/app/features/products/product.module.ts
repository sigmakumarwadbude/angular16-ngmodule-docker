import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [SharedModule, ProductRoutingModule],
})
export class ProductModule {}
